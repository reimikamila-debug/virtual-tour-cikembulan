# Virtual Tour Taman Satwa Cikembulan

Website pendamping virtual tour 3D Vista untuk Taman Satwa Cikembulan. Berfungsi sebagai media informasi, halaman pembuka, dan promosi digital.

## Teknologi

- HTML5 Semantik
- CSS3 Modern (Custom Properties, Grid, Flexbox)
- JavaScript Vanilla (ES6+)
- Tanpa database / backend / framework berat

## Struktur Project

```
virtual-tour-cikembulan/
├── index.html          → Halaman utama (landing page)
├── css/
│   ├── style.css       → Stylesheet utama & design system
│   └── responsive.css  → Media queries & responsive layout
├── js/
│   └── script.js       → Semua fitur interaktif
├── assets/
│   ├── images/         → Gambar hero, satwa, galeri
│   ├── icons/          → Ikon (menggunakan SVG inline)
│   └── videos/         → Video (disiapkan)
├── robots.txt          → SEO
├── sitemap.xml         → SEO
└── README.md           → Dokumentasi ini
```

## Menjalankan Website

1. Buka folder `virtual-tour-cikembulan` di file manager
2. Klik dua kali `index.html` untuk membuka di browser
3. Atau gunakan Live Server di VS Code
4. Atau jalankan server lokal:
   ```bash
   # Python
   python -m http.server 8080

   # Node.js
   npx serve .
   ```

## Cara Mengganti Konten

### 1. Link Virtual Tour 3D Vista

Cari dan ganti semua URL placeholder berikut di `index.html` dan `js/script.js`:

```
virtual-tour/index.htm?disable-background-preload=true
```

Ganti dengan URL virtual tour 3D Vista yang sebenarnya.

Di `js/script.js`, ubah variabel:
```javascript
const VIRTUAL_TOUR_URL = 'https://url-virtual-tour-anda.com';
```

### 2. Logo

Logo menggunakan emoji 🌿 secara default. Untuk mengganti dengan gambar:

1. Simpan file logo di `assets/images/logo.png`
2. Di `index.html`, ganti bagian `.navbar__logo-icon`:
   ```html
   <img src="assets/images/logo.png" alt="Logo Taman Satwa Cikembulan" width="40" height="40">
   ```
3. Lakukan hal yang sama di bagian footer

### 3. Gambar Hero

Ganti file `assets/images/hero-bg.png` dengan foto taman satwa yang sesuai. Ukuran yang disarankan: 1920×1080 piksel.

### 4. Gambar Satwa

Di `js/script.js`, ubah array `animalsData`. Setiap satwa memiliki properti:
```javascript
{
  id: 1,
  name: 'Nama Satwa',
  latin: 'Nama ilmiah',
  category: 'Mamalia', // Mamalia, Burung, Reptil, Primata
  status: 'LC',        // LC, NT, VU, EN
  statusLabel: 'Risiko Rendah',
  description: 'Deskripsi singkat satwa.',
  emoji: '🦌',         // Ganti dengan <img> tag jika menggunakan foto
  color: '#a5d6a7'     // Warna background placeholder
}
```

Untuk menggunakan foto asli, ubah function `createAnimalCard` di `script.js`:
- Ganti `.img-placeholder` dengan `<img src="assets/images/nama-satwa.jpg" alt="..." width="400" height="300" loading="lazy">`

### 5. Gambar Galeri

Di `js/script.js`, ubah array `galleryData` dengan gambar asli:
```javascript
{
  id: 1,
  caption: 'Keterangan foto',
  src: 'assets/images/galeri/foto1.jpg' // Tambahkan properti src
}
```

### 6. Informasi Kunjungan

Di `index.html`, cari section `#informasi` dan ubah:
- Jam operasional: `09.00 – 17.00 WIB`
- Harga tiket: `Rp30.000`
- Email, telepon, dll

### 7. Kontak & Media Sosial

Cari dan ganti di `index.html`:
- `[Masukkan alamat email]` → alamat email resmi
- `[Masukkan nomor telepon]` → nomor telepon resmi
- Link Instagram dan TikTok sudah diisi sesuai placeholder

### 8. Alamat & Link Google Maps

Cari dan ganti:
- `[Alamat lengkap Taman Satwa Cikembulan...]` → alamat lengkap
- Link Google Maps sudah menggunakan: `https://maps.app.goo.gl/iENK51gfSACBVNZt9`

### 9. Fasilitas

Ubah langsung di bagian HTML section `#fasilitas`. Setiap card fasilitas dapat ditambah, dihapus, atau dimodifikasi.

## Fitur

- ✅ Navbar sticky dengan indikator aktif
- ✅ Hamburger menu responsif
- ✅ Hero section dengan CTA
- ✅ Integrasi virtual tour 3D Vista (iframe + tab baru)
- ✅ Koleksi satwa dengan filter & pencarian
- ✅ Galeri foto dengan lightbox
- ✅ Informasi kunjungan lengkap
- ✅ Peta & lokasi dengan Google Maps
- ✅ Animasi scroll reveal
- ✅ Tombol kembali ke atas
- ✅ Toast notification
- ✅ Responsif (320px – desktop besar)
- ✅ Aksesibel (keyboard nav, ARIA, fokus, alt text)
- ✅ SEO dasar (meta tags, Open Graph, Schema.org)
- ✅ `prefers-reduced-motion` support

## Catatan

- Data satwa, harga, dan informasi lainnya menggunakan **placeholder** dan harus diganti dengan data resmi.
- Website bersifat statis dan tidak memerlukan database atau backend.
- Virtual tour 3D Vista tidak termasuk dalam project ini — website ini hanya sebagai penghubung.

## Lisensi

© 2026 Taman Satwa Cikembulan. Seluruh hak cipta dilindungi.
