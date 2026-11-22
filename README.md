# Digital Products Catalog — Imam Nurcholis

Website katalog produk digital (Gumroad All-in-One) yang dirancang dengan sistem desain editorial **imamnur.my.id** (`Instrument Serif` + `Inter Tight`, palet paper/ink/vermilion/navy/sand/olive, garis hairline, dan 100% statis tanpa build tools).

## Fitur Utama
- **Filter kategori & pencarian real-time** (berdasarkan judul, deskripsi, kategori, fitur, maupun kode produk).
- **2 Mode Tampilan**: **Grid** (kartu editorial) dan **Index** (daftar arsip minimalis dengan hover preview).
- **Modal Detail Produk**: menampilkan preview, spesifikasi, daftar isi/fitur, tombol beli langsung ke Gumroad, navigasi Prev/Next, serta tombol **Salin Link** (mendukung deep-link `#id-produk`).
- **Auto SVG Editorial Art**: produk yang belum memiliki gambar `cover` otomatis mendapatkan ilustrasi geometris sesuai palet warna `imamnur.my.id`.
- **100% Statis & Ringan**: langsung bisa dibuka di browser atau di-deploy ke Vercel, Netlify, maupun GitHub Pages.

## Cara Mengedit / Menambah Produk
Buka file [`assets/js/products.js`](assets/js/products.js), lalu ubah atau tambahkan objek baru pada array `products`:

```js
{
  id: "nama-produk-unik",
  code: "DG-007-1",
  title: "Nama Produk Anda",
  category: "Templates", // Kategori baru otomatis muncul di filter
  year: "2026",
  price: 99000,          // Isi 0 jika gratis
  originalPrice: 149000, // Opsional (harga coret), isi 0 jika tidak ada diskon
  badge: "Baru",         // Opsional: "Bestseller", "Baru", "Gratis", dll
  featured: true,
  tone: 0,               // 0: Navy, 1: Sand, 2: Vermilion, 3: Olive
  art: "grid",           // Fallback SVG: "dial", "dots", "bars", "rings", "waves", "grid"
  cover: "images/cover-produk.webp", // Kosongkan "" untuk pakai SVG otomatis
  summary: "Ringkasan singkat produk.",
  description: "Deskripsi lengkap yang tampil di modal detail.",
  features: ["Fitur 1", "Fitur 2"],
  specs: [["Format", "PDF + Notion"], ["Lisensi", "Personal"]],
  buyUrl: "https://imamnur.gumroad.com/l/nama-produk",
  buyLabel: "Beli di Gumroad",
}
```

## Menjalankan Secara Lokal
Cukup klik dua kali `index.html`, atau jalankan local server agar font & clipboard API berjalan optimal:
```bash
npx serve .
```
