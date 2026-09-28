import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Database,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  X
} from 'lucide-react'
import api from './services/api'
import {
  getAnimalsFromSupabase,
  addAnimalToSupabase,
  updateAnimalInSupabase,
  deleteAnimalFromSupabase
} from './services/supabase'
import logo from './assets/taman-satwa-logo.svg.png'
import './App.css'

const safeSetStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn('Storage quota exceeded, pruning old base64 entries:', err)
    try {
      if (Array.isArray(value)) {
        const pruned = value.map((item, index) => {
          if (index > 2 && item.foto && item.foto.startsWith('data:')) {
            return { ...item, foto: '' }
          }
          return item
        })
        localStorage.setItem(key, JSON.stringify(pruned))
      }
    } catch (e) {
      console.warn('Could not write to localStorage:', e)
    }
  }
}

const getAnimals = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('kebun_animals') || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const publicSite = import.meta.env.VITE_PUBLIC_SITE_URL || '/'

function Brand() {
  return (
    <div className="brand">
      <img src={logo} alt="Logo Taman Satwa Cikembulan" />
      <div>
        <strong>Taman Satwa</strong>
        <small>ADMIN AREA</small>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }) {
  return localStorage.getItem('kebun_token') ? children : <Navigate to="/login" replace />
}

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    if (!form.username || !form.password) return setError('Isi username dan password terlebih dahulu.')
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/auth/login', form)
      localStorage.setItem('kebun_token', data.token)
    } catch {
      if (form.username === 'admin' && form.password === 'admin123') {
        localStorage.setItem('kebun_token', 'demo-token')
      } else {
        setLoading(false)
        return setError('Login gagal. Coba admin / admin123 untuk mode demo.')
      }
    }
    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <main className="login-page">
      <div className="login-art">
        <Brand />
        <div className="art-copy">
          <p className="eyebrow">ADMIN CONSOLE / 01</p>
          <h1>Rawat data,<br /><em>tumbuhkan</em> hasil.</h1>
          <p>Ruang kerja terpusat untuk mengelola seluruh data hewan di database Supabase.</p>
        </div>
        <div className="art-footer">EST. 2026　●　SISTEM INTERNAL SUPABASE</div>
      </div>
      <section className="login-panel">
        <div className="mobile-brand"><Brand /></div>
        <div className="login-heading">
          <p className="eyebrow">SELAMAT DATANG KEMBALI</p>
          <h2>Masuk ke ruang kerja.</h2>
          <p>Gunakan akun admin untuk melanjutkan ke database.</p>
        </div>
        <form onSubmit={submit} className="login-form">
          <label>
            Username
            <input
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Masukkan username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Masukkan password"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" disabled={loading}>
            {loading ? 'Memeriksa...' : 'Masuk ke dashboard'}
            <ChevronRight size={18} />
          </button>
        </form>
        <div className="login-note">
          <ShieldCheck size={17} />Area ini khusus admin terverifikasi.
        </div>
      </section>
    </main>
  )
}

function AdminLayout({ animals, loading, refreshData, saveAnimal, updateAnimal, deleteAnimal }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const logout = () => {
    localStorage.removeItem('kebun_token')
    navigate('/login')
  }

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/galeri', label: 'Galeri Hewan', icon: Search }
  ]

  return (
    <div className="app-shell">
      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <div className="sidebar-brand">
          <Brand />
          <button className="icon-button mobile-close" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="sidebar-label">MENU UTAMA</div>
        <nav>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              <Icon size={18} />
              {label}
              {location.pathname === to && <ChevronRight size={15} className="nav-arrow" />}
            </NavLink>
          ))}
          <a className="nav-item" href={publicSite} target="_blank" rel="noreferrer">
            <ArrowUpRight size={18} />Lihat Website
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="admin-chip">
            <div className="avatar">A</div>
            <div>
              <strong>Admin</strong>
              <small>Pengelola Galeri</small>
            </div>
          </div>
          <button className="logout-button" onClick={logout}>
            <LogOut size={17} />Logout
          </button>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button className="icon-button menu-trigger" onClick={() => setOpen(true)}>
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            TAMAN SATWA <ChevronRight size={14} />{' '}
            <span>
              {location.pathname === '/input-hewan'
                ? 'INPUT HEWAN'
                : location.pathname === '/galeri'
                ? 'GALERI HEWAN'
                : 'DASHBOARD'}
            </span>
          </div>
          <div className="topbar-right">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#065f46'
              }}
              title="Terhubung ke Database Supabase"
            >
              <Database size={13} style={{ color: '#059669' }} />
              <span>Supabase DB</span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 6px #10b981'
                }}
              />
            </div>
            <CircleUserRound size={22} />
          </div>
        </header>

        {notice && (
          <div className="toast">
            <CheckCircle2 size={17} />
            {notice}
            <button onClick={() => setNotice('')}>
              <X size={15} />
            </button>
          </div>
        )}

        <Routes>
          <Route path="/dashboard" element={<Overview animals={animals} loading={loading} />} />
          <Route
            path="/galeri"
            element={
              <Dashboard
                animals={animals}
                loading={loading}
                onRefresh={refreshData}
                onDelete={deleteAnimal}
                onUpdate={updateAnimal}
                notify={setNotice}
              />
            }
          />
          <Route path="/input-hewan" element={<InputHewan saveAnimal={saveAnimal} notify={setNotice} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function Overview({ animals, loading }) {
  const withPhotos = animals.filter((animal) => animal.foto).length

  return (
    <main className="content overview-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">RINGKASAN DATABASE SUPABASE</p>
          <h1>Dashboard</h1>
          <p className="heading-subtitle">Ringkasan aktivitas dan data galeri hewan langsung dari Supabase.</p>
        </div>
      </div>

      <div className="stats-grid">
        {[
          ['Total Data Hewan', loading ? '...' : animals.length, 'Data tercatat di Supabase', 'green'],
          ['Hewan Dengan Foto', loading ? '...' : withPhotos, 'Sudah memiliki foto lengkap', 'yellow'],
          ['Jenis Hewan', loading ? '...' : new Set(animals.map((animal) => animal.jenis)).size, 'Kategori satwa tercatat', 'blue']
        ].map(([label, value, note, color]) => (
          <div className="stat-card" key={label}>
            <div className={`stat-icon ${color}`}>
              <BarChart3 size={18} />
            </div>
            <div>
              <p>{label}</p>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
          </div>
        ))}
      </div>

      <section className="overview-callout">
        <div>
          <p className="eyebrow">PENGELOLAAN GALERI HEWAN</p>
          <h2>Kelola foto dan informasi hewan di Supabase.</h2>
          <p>Lihat seluruh koleksi database, buka detail foto, atau tambahkan data hewan baru yang langsung sinkron ke website utama.</p>
        </div>
        <NavLink to="/galeri" className="primary-button">
          <Search size={17} />Kelola Galeri Hewan
        </NavLink>
      </section>
    </main>
  )
}

function Dashboard({ animals, loading, onRefresh, onDelete, onUpdate, notify }) {
  const [query, setQuery] = useState('')
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [editingAnimal, setEditingAnimal] = useState(null)

  const filtered = useMemo(
    () =>
      animals.filter((a) =>
        Object.values(a).some((v) => String(v || '').toLowerCase().includes(query.toLowerCase()))
      ),
    [animals, query]
  )

  const handleDelete = async (id, nama) => {
    const success = await onDelete(id, nama)
    if (success) {
      notify(`Data "${nama}" berhasil dihapus dari database Supabase.`)
    }
  }

  return (
    <main className="content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DATABASE SUPABASE / GALERI</p>
          <h1>Galeri Hewan</h1>
          <p className="heading-subtitle">Kelola foto, nama, dan jenis hewan yang tersimpan di Supabase.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="secondary-button"
            onClick={onRefresh}
            title="Segarkan data dari Supabase"
            style={{ background: '#fff', border: '1px solid #dce4dd' }}
          >
            <RefreshCw size={15} className={loading ? 'spin-icon' : ''} />
            <span>{loading ? 'Memuat...' : 'Segarkan'}</span>
          </button>
          <NavLink to="/input-hewan" className="primary-button add-button">
            <Plus size={18} />Tambah hewan
          </NavLink>
        </div>
      </div>

      <section className="table-section">
        <div className="section-header">
          <div>
            <h2>Data hewan ({filtered.length} satwa)</h2>
            <p>Data tersimpan di tabel <code>hewan</code> Supabase</p>
          </div>
          <div className="search-box">
            <Search size={17} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama hewan..." />
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nama hewan</th>
                <th>Jenis</th>
                <th>Ditambahkan</th>
                <th style={{ width: '85px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading && animals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <RefreshCw size={16} className="spin-icon" />
                      <span>Mengambil data langsung dari Supabase...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((a, index) => (
                <tr key={`${a.id}-${index}`}>
                  <td>
                    <button
                      className="photo-button"
                      onClick={() => setSelectedAnimal(a)}
                      title={`Lihat detail ${a.nama_hewan}`}
                    >
                      {a.foto ? (
                        <img className="animal-thumb" src={a.foto} alt={a.nama_hewan} />
                      ) : (
                        <span className="animal-thumb placeholder"><Leaf size={14} /></span>
                      )}
                    </button>
                  </td>
                  <td>
                    <div className="animal-name">
                      <strong>{a.nama_hewan}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="type-pill">{a.jenis}</span>
                  </td>
                  <td>
                    {a.created_at
                      ? new Date(a.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })
                      : '-'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <button className="edit-button" onClick={() => setEditingAnimal(a)} title="Edit data di Supabase">
                        <Pencil size={15} />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(a.id, a.nama_hewan)}
                        title="Hapus dari Supabase"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !filtered.length && (
                <tr>
                  <td colSpan="5" className="empty-state">Belum ada data yang cocok di Supabase.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* DETAIL MODAL */}
      {selectedAnimal && (
        <div className="detail-overlay" onClick={() => setSelectedAnimal(null)}>
          <section className="detail-modal" onClick={(event) => event.stopPropagation()}>
            <button className="detail-close" onClick={() => setSelectedAnimal(null)} aria-label="Tutup detail">
              <X size={18} />
            </button>
            <div className="detail-photo">
              {selectedAnimal.foto ? (
                <img
                  src={selectedAnimal.foto}
                  alt={selectedAnimal.nama_hewan}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="detail-photo-empty">
                  <Leaf size={40} />
                  <span>Belum ada foto</span>
                </div>
              )}
            </div>
            <div className="detail-content">
              <p className="eyebrow">DETAIL HEWAN SUPABASE</p>
              <h2>{selectedAnimal.nama_hewan}</h2>
              <div className="detail-grid">
                <div>
                  <small>Jenis</small>
                  <strong>{selectedAnimal.jenis || '-'}</strong>
                </div>
                <div>
                  <small>Ditambahkan</small>
                  <strong>
                    {selectedAnimal.created_at
                      ? new Date(selectedAnimal.created_at).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })
                      : '-'}
                  </strong>
                </div>
                {selectedAnimal.ukuran && (
                  <div>
                    <small>Ukuran</small>
                    <strong>{selectedAnimal.ukuran}</strong>
                  </div>
                )}
                {selectedAnimal.jenis_kelamin && (
                  <div>
                    <small>Jenis Kelamin</small>
                    <strong>{selectedAnimal.jenis_kelamin}</strong>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingAnimal && (
        <EditModal
          animal={editingAnimal}
          onClose={() => setEditingAnimal(null)}
          onSave={async (updated) => {
            await onUpdate(editingAnimal.id, updated)
            setEditingAnimal(null)
            notify('Data hewan berhasil diperbarui di Supabase.')
          }}
        />
      )}
    </main>
  )
}

function EditModal({ animal, onClose, onSave }) {
  const [form, setForm] = useState({
    nama_hewan: animal.nama_hewan || '',
    jenis: animal.jenis || '',
    foto: animal.foto || ''
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const update = (key, value) => setForm({ ...form, [key]: value })

  const selectPhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('File foto harus berupa gambar.')
    if (file.size > 2 * 1024 * 1024) return setError('Ukuran foto maksimal 2 MB.')

    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const scale = Math.min(1, 600 / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        setError('')
        update('foto', canvas.toDataURL('image/jpeg', 0.65))
      }
      image.onerror = () => setError('Foto tidak dapat dibaca. Silakan pilih gambar lain.')
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!form.nama_hewan.trim() || !form.jenis.trim()) {
      return setError('Nama hewan dan jenis hewan wajib diisi.')
    }
    setSaving(true)
    setError('')
    try {
      await onSave(form)
      onClose()
    } catch (err) {
      setError('Gagal menyimpan: ' + (err.message || 'Terjadi kesalahan'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="detail-overlay" onClick={onClose}>
      <section
        className="detail-modal edit-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'block', maxWidth: '640px', width: '100%' }}
      >
        <button className="detail-close" onClick={onClose} aria-label="Tutup form edit">
          <X size={18} />
        </button>
        <div style={{ padding: '34px 32px' }}>
          <div className="page-heading" style={{ marginBottom: '22px' }}>
            <div>
              <p className="eyebrow">EDIT DATA SUPABASE</p>
              <h2 style={{ fontSize: '24px', margin: '0 0 6px', fontWeight: 700 }}>Edit Informasi Hewan</h2>
              <p className="heading-subtitle">Perbarui data atau ganti foto satwa di Supabase.</p>
            </div>
          </div>

          <form className="animal-form" onSubmit={submit} style={{ padding: 0 }}>
            <label>
              Foto hewan
              <div className="photo-upload">
                {form.foto ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={form.foto} alt="Preview hewan" className="photo-preview" />
                    <button
                      type="button"
                      onClick={() => update('foto', '')}
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        background: '#e26d62',
                        color: '#fff',
                        border: 0,
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer'
                      }}
                      title="Hapus foto"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="photo-placeholder">
                    <Leaf size={24} />
                    <span>Belum ada foto</span>
                  </div>
                )}
                <div>
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} />
                  <small>JPG, PNG, atau WEBP. Maksimal 2 MB.</small>
                </div>
              </div>
            </label>

            <label>
              Nama hewan
              <input
                value={form.nama_hewan}
                onChange={(e) => update('nama_hewan', e.target.value)}
                placeholder="Contoh: Kasuari Gelambir Merah"
              />
            </label>

            <label>
              Jenis hewan
              <select value={form.jenis} onChange={(e) => update('jenis', e.target.value)}>
                <option value="">Pilih jenis</option>
                <option>Mamalia</option>
                <option>Unggas</option>
                <option>Reptil</option>
                <option>Ikan</option>
                <option>Lainnya</option>
              </select>
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions" style={{ marginTop: '22px' }}>
              <button type="button" onClick={onClose} className="secondary-button">
                Batal
              </button>
              <button className="primary-button" disabled={saving}>
                {saving ? 'Menyimpan...' : 'Simpan perubahan'}
                <ChevronRight size={17} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

function InputHewan({ saveAnimal, notify }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nama_hewan: '', jenis: '', foto: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const update = (key, value) => setForm({ ...form, [key]: value })

  const selectPhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('File foto harus berupa gambar.')
    if (file.size > 2 * 1024 * 1024) return setError('Ukuran foto maksimal 2 MB.')

    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const scale = Math.min(1, 600 / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale))
        canvas.height = Math.max(1, Math.round(image.height * scale))
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        setError('')
        update('foto', canvas.toDataURL('image/jpeg', 0.65))
      }
      image.onerror = () => setError('Foto tidak dapat dibaca. Silakan pilih gambar lain.')
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!form.nama_hewan.trim() || !form.jenis.trim()) {
      return setError('Nama hewan dan jenis hewan wajib diisi.')
    }
    setSaving(true)
    setError('')
    try {
      await saveAnimal(form)
      notify('Data hewan berhasil disimpan ke Supabase.')
      navigate('/dashboard')
    } catch (err) {
      console.warn('Gagal menyimpan ke Supabase:', err)
      setError('Gagal menyimpan ke Supabase: ' + (err.message || 'Terjadi kesalahan'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="content narrow-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DATABASE SUPABASE / DATA BARU</p>
          <h1>Input hewan</h1>
          <p className="heading-subtitle">Tambahkan data hewan baru yang langsung disimpan ke database Supabase.</p>
        </div>
      </div>

      <section className="form-section">
        <div className="form-intro">
          <div className="form-icon">
            <Plus size={20} />
          </div>
          <div>
            <h2>Informasi hewan</h2>
            <p>Lengkapi detail di bawah ini untuk disimpan ke Supabase.</p>
          </div>
        </div>

        <form className="animal-form" onSubmit={submit}>
          <label>
            Foto hewan
            <div className="photo-upload">
              {form.foto ? (
                <img src={form.foto} alt="Preview hewan" className="photo-preview" />
              ) : (
                <div className="photo-placeholder">
                  <Leaf size={24} />
                  <span>Belum ada foto</span>
                </div>
              )}
              <div>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} />
                <small>JPG, PNG, atau WEBP. Maksimal 2 MB.</small>
              </div>
            </div>
          </label>

          <label>
            Nama hewan
            <input
              value={form.nama_hewan}
              onChange={(e) => update('nama_hewan', e.target.value)}
              placeholder="Contoh: Harimau Sumatra"
            />
          </label>

          <label>
            Jenis hewan
            <select value={form.jenis} onChange={(e) => update('jenis', e.target.value)}>
              <option value="">Pilih jenis</option>
              <option>Mamalia</option>
              <option>Unggas</option>
              <option>Reptil</option>
              <option>Ikan</option>
              <option>Lainnya</option>
            </select>
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <NavLink to="/dashboard" className="secondary-button">
              Batal
            </NavLink>
            <button className="primary-button" disabled={saving}>
              {saving ? 'Menyimpan ke Supabase...' : 'Simpan data'}
              <ChevronRight size={17} />
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

function App() {
  const [animals, setAnimals] = useState(getAnimals)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await getAnimalsFromSupabase()
      if (Array.isArray(data) && data.length > 0) {
        setAnimals(data)
        safeSetStorage('kebun_animals', data)
      } else {
        const local = getAnimals()
        if (local.length > 0) setAnimals(local)
      }
    } catch (err) {
      console.warn('Gagal memuat data dari Supabase:', err)
      const local = getAnimals()
      if (local.length > 0) setAnimals(local)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const saveAnimal = async (payload) => {
    const created = await addAnimalToSupabase(payload)
    const newItem = created || {
      ...payload,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    }
    const next = [newItem, ...animals.filter((a) => a.id !== newItem.id)]
    setAnimals(next)
    safeSetStorage('kebun_animals', next)
    return newItem
  }

  const updateAnimal = async (id, payload) => {
    const updated = await updateAnimalInSupabase(id, payload)
    const next = animals.map((a) => (a.id === id ? { ...a, ...(updated || payload) } : a))
    setAnimals(next)
    safeSetStorage('kebun_animals', next)
    return updated
  }

  const deleteAnimal = async (id, nama) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data "${nama || 'hewan ini'}" dari database Supabase?`)) {
      return false
    }
    await deleteAnimalFromSupabase(id)
    const next = animals.filter((a) => a.id !== id)
    setAnimals(next)
    safeSetStorage('kebun_animals', next)
    return true
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <AdminLayout
                animals={animals}
                loading={loading}
                refreshData={loadData}
                saveAnimal={saveAnimal}
                updateAnimal={updateAnimal}
                deleteAnimal={deleteAnimal}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export default App
