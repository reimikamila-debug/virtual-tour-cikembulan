import api from './api'

export const SUPABASE_URL = 'https://dltwibgfkhuxobzigvpy.supabase.co'
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdHdpYmdma2h1eG9iemlndnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODAwNzksImV4cCI6MjEwNTA1NjA3OX0.gJcT8sHoWp5gzB-kNfOfVNNkODmVC6cTHt_RhOCL3e0'

const defaultHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
}

/**
 * Mengambil seluruh data hewan dari database Supabase (tabel hewan).
 * Mengembalikan array hewan diurutkan dari yang terbaru (created_at DESC).
 */
export async function getAnimalsFromSupabase() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/hewan?select=*&order=created_at.desc`, {
      method: 'GET',
      headers: defaultHeaders
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) {
        return data
      }
    }
  } catch (err) {
    console.warn('Gagal memuat langsung dari Supabase REST, beralih ke API fallback:', err)
  }

  // Fallback ke Express backend API jika tersedia
  try {
    const { data } = await api.get('/hewan')
    const rows = Array.isArray(data) ? data : data?.hewan || data?.data || []
    if (rows.length > 0) return rows
  } catch (apiErr) {
    console.warn('API fallback juga gagal:', apiErr)
  }

  return []
}

/**
 * Menambahkan data hewan baru langsung ke Supabase (tabel hewan).
 */
export async function addAnimalToSupabase(payload) {
  const item = {
    nama_hewan: (payload.nama_hewan || '').trim(),
    jenis: (payload.jenis || '').trim(),
    foto: payload.foto || null,
    ukuran: payload.ukuran || null,
    jenis_kelamin: payload.jenis_kelamin || null
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/hewan`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        Prefer: 'return=representation'
      },
      body: JSON.stringify(item)
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data[0]) {
        return data[0]
      }
    } else {
      const errText = await res.text()
      console.warn('Supabase POST error:', res.status, errText)
    }
  } catch (err) {
    console.warn('Supabase POST fetch failed:', err)
  }

  // Fallback ke local Express API jika Supabase direct gagal
  const { data } = await api.post('/hewan', item)
  return data
}

/**
 * Memperbarui data hewan di Supabase (tabel hewan) berdasarkan ID.
 */
export async function updateAnimalInSupabase(id, payload) {
  const item = {}
  if (payload.nama_hewan !== undefined) item.nama_hewan = payload.nama_hewan.trim()
  if (payload.jenis !== undefined) item.jenis = payload.jenis.trim()
  if (payload.foto !== undefined) item.foto = payload.foto || null
  if (payload.ukuran !== undefined) item.ukuran = payload.ukuran || null
  if (payload.jenis_kelamin !== undefined) item.jenis_kelamin = payload.jenis_kelamin || null

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/hewan?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        Prefer: 'return=representation'
      },
      body: JSON.stringify(item)
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data[0]) {
        return data[0]
      }
    } else {
      const errText = await res.text()
      console.warn('Supabase PATCH error:', res.status, errText)
    }
  } catch (err) {
    console.warn('Supabase PATCH fetch failed:', err)
  }

  // Fallback ke local Express API
  const { data } = await api.put(`/hewan/${id}`, item)
  return data
}

/**
 * Menghapus data hewan dari database Supabase (tabel hewan) berdasarkan ID.
 */
export async function deleteAnimalFromSupabase(id) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/hewan?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: defaultHeaders
    })

    if (res.ok) {
      return true
    } else {
      const errText = await res.text()
      console.warn('Supabase DELETE error:', res.status, errText)
    }
  } catch (err) {
    console.warn('Supabase DELETE fetch failed:', err)
  }

  // Fallback ke local Express API
  await api.delete(`/hewan/${id}`)
  return true
}
