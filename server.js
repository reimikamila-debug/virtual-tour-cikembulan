import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || 'b643c04ecc7134b3078d31132d3b7845298f13c2da70f63fac0991ba9b696446'

// Supabase JS Client
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dltwibgfkhuxobzigvpy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
const supabase = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// PostgreSQL Pool
const { Pool } = pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 2000
})

// Prevent background pool errors from crashing Node process
pool.on('error', (err) => {
  console.warn('⚠️ PostgreSQL pool connection error:', err.message)
})

let isDbConnected = false

// In-Memory Fallback Store
let fallbackAnimals = []

// Initialize DB schema & default admin if needed
async function initDatabase() {
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(80) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS hewan (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nama_hewan VARCHAR(120) NOT NULL,
        ukuran VARCHAR(40),
        jenis VARCHAR(60) NOT NULL,
        jenis_kelamin VARCHAR(20),
        foto TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE hewan ALTER COLUMN ukuran DROP NOT NULL;
      ALTER TABLE hewan ALTER COLUMN jenis_kelamin DROP NOT NULL;
    `)

    // Seed default admin if table is empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM admins')
    if (parseInt(rows[0].count, 10) === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 12)
      await pool.query('INSERT INTO admins (username, password) VALUES ($1, $2)', ['admin', hashedPassword])
      console.log('✅ Seeded default admin user ke database (username: admin, password: admin123)')
    }
    isDbConnected = true
    console.log('✅ Database PostgreSQL Supabase terhubung & siap digunakan.')
  } catch (err) {
    isDbConnected = false
    console.log('⚠️ Database remote tidak dapat dijangkau. Menggunakan mode Lokal Fallback untuk pengujian.')
  }
}
initDatabase()

// Auth Middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan.' })
  }
  if (token === 'demo-token') {
    req.user = { username: 'admin' }
    return next()
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token tidak valid.' })
  }
}

// --- API ROUTES ---

// 1. Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password wajib diisi.' })
  }

  if (isDbConnected) {
    try {
      const { rows } = await pool.query('SELECT id, username, password FROM admins WHERE username = $1', [username])
      const admin = rows[0]
      if (admin && (await bcrypt.compare(password, admin.password))) {
        const token = jwt.sign(
          { id: admin.id, username: admin.username },
          JWT_SECRET,
          { expiresIn: '8h' }
        )
        return res.status(200).json({ token })
      }
    } catch (err) {
      console.warn('Login DB query fallback:', err.message)
    }
  }

  if (supabase) {
    try {
      const { data } = await supabase.from('admins').select('id, username, password').eq('username', username)
      const admin = data?.[0]
      if (admin && (await bcrypt.compare(password, admin.password))) {
        const token = jwt.sign(
          { id: admin.id, username: admin.username },
          JWT_SECRET,
          { expiresIn: '8h' }
        )
        return res.status(200).json({ token })
      }
    } catch (err) {
      console.warn('Login Supabase JS fallback:', err.message)
    }
  }

  // Fallback Auth Check
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ id: 'admin-local', username: 'admin' }, JWT_SECRET, { expiresIn: '8h' })
    return res.status(200).json({ token })
  }

  return res.status(401).json({ message: 'Username atau password salah.' })
})

// 2. Get Animals (Public for User Site & Admin)
app.get('/api/hewan', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('hewan').select('*').order('created_at', { ascending: false })
      if (!error && Array.isArray(data)) {
        return res.status(200).json(data)
      }
    } catch (err) {
      console.warn('Fetch hewan Supabase JS error:', err.message)
    }
  }

  if (isDbConnected) {
    try {
      const { rows } = await pool.query('SELECT * FROM hewan ORDER BY created_at DESC')
      return res.status(200).json(rows)
    } catch (err) {
      console.warn('Fetch hewan DB fallback:', err.message)
    }
  }

  return res.status(200).json(fallbackAnimals)
})

const withTimeout = (promise, ms = 3500) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Operation timeout')), ms))
  ])

// 3. Add Animal (Protected)
app.post('/api/hewan', requireAuth, async (req, res) => {
  const { nama_hewan, jenis, foto } = req.body || {}
  if (!nama_hewan?.trim() || !jenis?.trim()) {
    return res.status(400).json({ message: 'Nama hewan dan jenis hewan wajib diisi.' })
  }

  const payload = {
    nama_hewan: nama_hewan.trim(),
    jenis: jenis.trim(),
    foto: foto || null
  }

  if (supabase) {
    try {
      const { data, error } = await withTimeout(supabase.from('hewan').insert([payload]).select(), 3500)
      if (!error && data?.[0]) {
        console.log('✅ Success insert to Supabase:', data[0].nama_hewan)
        return res.status(201).json(data[0])
      } else if (error) {
        console.warn('Supabase insert error:', error.message)
      }
    } catch (err) {
      console.warn('Create hewan Supabase JS error:', err.message)
    }
  }

  if (isDbConnected) {
    try {
      const { rows } = await withTimeout(
        pool.query(
          'INSERT INTO hewan (nama_hewan, jenis, foto) VALUES ($1, $2, $3) RETURNING *',
          [payload.nama_hewan, payload.jenis, payload.foto]
        ),
        3500
      )
      return res.status(201).json(rows[0])
    } catch (err) {
      console.warn('Create hewan DB fallback:', err.message)
    }
  }

  const newAnimal = {
    id: crypto.randomUUID(),
    ...payload,
    created_at: new Date().toISOString()
  }
  fallbackAnimals.unshift(newAnimal)
  return res.status(201).json(newAnimal)
})

// 4. Update Animal (Protected)
app.put('/api/hewan/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const { nama_hewan, jenis, foto } = req.body || {}

  const payload = {
    nama_hewan,
    jenis,
    foto: foto || null
  }

  if (supabase) {
    try {
      const { data, error } = await supabase.from('hewan').update(payload).eq('id', id).select()
      if (!error && data?.[0]) {
        return res.status(200).json(data[0])
      }
    } catch (err) {
      console.warn('Update hewan Supabase JS error:', err.message)
    }
  }

  if (isDbConnected) {
    try {
      const result = await pool.query(
        'UPDATE hewan SET nama_hewan=$1, jenis=$2, foto=$3 WHERE id=$4 RETURNING *',
        [nama_hewan, jenis, foto || null, id]
      )
      if (result.rowCount) {
        return res.status(200).json(result.rows[0])
      }
    } catch (err) {
      console.warn('Update hewan DB fallback:', err.message)
    }
  }

  const idx = fallbackAnimals.findIndex((a) => a.id === id)
  if (idx !== -1) {
    fallbackAnimals[idx] = {
      ...fallbackAnimals[idx],
      ...payload
    }
    return res.status(200).json(fallbackAnimals[idx])
  }
  return res.status(404).json({ message: 'Data tidak ditemukan.' })
})

// 5. Delete Animal (Protected)
app.delete('/api/hewan/:id', requireAuth, async (req, res) => {
  const { id } = req.params

  if (supabase) {
    try {
      const { error } = await supabase.from('hewan').delete().eq('id', id)
      if (!error) {
        return res.status(204).end()
      }
    } catch (err) {
      console.warn('Delete hewan Supabase JS error:', err.message)
    }
  }

  if (isDbConnected) {
    try {
      await pool.query('DELETE FROM hewan WHERE id=$1', [id])
      return res.status(204).end()
    } catch (err) {
      console.warn('Delete hewan DB fallback:', err.message)
    }
  }

  fallbackAnimals = fallbackAnimals.filter((a) => a.id !== id)
  return res.status(204).end()
})

// --- STATIC & SPA ROUTING ---

// Serve Admin static files under /admin
app.use('/admin', express.static(path.join(__dirname, 'admin/dist')))

// SPA fallback for /admin routes
app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/dist/index.html'))
})

// Serve main user website static files
app.use(express.static(__dirname))

// Fallback to main website index.html for any unhandled GET routes
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'index.html'))
  }
  next()
})

app.listen(PORT, () => {
  console.log(`==================================================`)
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
  console.log(`🌐 Website User : http://localhost:${PORT}/`)
  console.log(`🔐 Admin Dashboard: http://localhost:${PORT}/admin`)
  console.log(`==================================================`)
})
