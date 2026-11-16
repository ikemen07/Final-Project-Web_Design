# SKINORA — Premium Skincare & Makeup E-Commerce Website

> **Tugas Akhir Mata Kuliah Desain Web (Final Project Web Design)**  
> **Tema:** Interactive Web Application Development  
> **Identitas Visual:** Luxury Pink & White Palette (`#E8A0B8`, `#C96F91`, `#FCE8EF`, `#FFFFFF`, `#292329`)

---

## 1. Project Title & Overview

**SKINORA** adalah aplikasi web e-commerce perawatan kulit (*skincare*) dan riasan (*makeup*) berkelas premium yang dirancang khusus untuk memenuhi kebutuhan perawatan kulit wanita maupun pria secara inklusif. Website ini dibangun untuk memberikan pengalaman berbelanja daring yang elegan, intuitif, dan fungsional dengan dukungan arsitektur data persisten berbasis **Local Storage** dan teknologi web murni (*Vanilla JavaScript*).

---

## 2. Project Objectives

1. Mengimplementasikan konsep dasar rekayasa web: **HTML5 Semantik**, **CSS3 Tingkat Lanjut** (Flexbox, CSS Grid, CSS Variables, Responsive Media Queries), dan **Vanilla JavaScript** (DOM Manipulation, Event Handling, Higher-Order Array Methods).
2. Membangun sistem katalog produk komprehensif dengan **49 produk awal** (foto asli dari tim) di **8 kategori** (termasuk Bundle) dengan filter **5 jenis kulit**.
3. Menyediakan alur belanja e-commerce lengkap end-to-end: penelusuran katalog, filter gabungan (*combinable filters*), detail produk, checkout dengan daftar item dinamis, batasan stok (*stock clamping*), dan simulasi checkout dengan verifikasi data formulir.
4. Membangun **Portal Admin Dashboard** fungsional dengan visualisasi data interaktif menggunakan **Chart.js**, manajemen inventaris lengkap (**CRUD**: *Create, Read, Update, Delete*), pembaruan status pesanan, serta fitur ekspor data ke format **CSV**.
5. Menghadirkan fitur modern penunjang pengalaman pengguna: **Konsultan AI Cerdas** (*rule-based beauty advisor*), **Mode Gelap (*Dark Mode*)**, dan sistem daftar keinginan (**Wishlist**).

---

## 3. Technologies Used

- **HTML5**: Struktur semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<form>`).
- **CSS3 & Tailwind CSS**:
  - CSS Grid & Flexbox untuk tata letak dinamis dan adaptif.
  - CSS Variables & Custom Theme tokens untuk palet warna Pink & White serta Dark Mode.
  - Media Queries untuk reflow pada viewport Desktop (1440px), Tablet (768px), dan Mobile (390px).
- **Vanilla JavaScript (ES6+)**:
  - Manipulasi DOM dan Event Delegation tanpa dependensi framework (React/Vue/Angular).
  - Array Methods: `.filter()`, `.map()`, `.reduce()`, `.sort()`, `.find()`, `.some()`.
  - Form Validation murni pada sisi klien dengan umpan balik visual instan.
- **Local Storage API**: Persistensi data lokal untuk produk, kategori, sesi login, keranjang belanja, wishlist, preferensi tema, dan riwayat pesanan.
- **Chart.js**: Visualisasi grafik analitik penjualan, status pesanan, dan distribusi kategori pada Admin Dashboard.
- **SweetAlert2**: Notifikasi toast elegan dan dialog konfirmasi tindakan destruktif.
- **FontAwesome 6 & Google Fonts**: Ikonografi vektor dan tipografi mewah (*Cormorant Garamond* & *Plus Jakarta Sans*).

---

## 4. Main Features

- **Katalog 49 Produk Multi-Kriteria**: Filter pencarian instan (nama, brand, deskripsi), 8 kategori, 5 jenis kulit, rentang harga, dan 4 metode pengurutan.
- **Pesan Langsung & Checkout**: Tombol *Pesan* di kartu produk dan halaman detail langsung membuka halaman checkout. Daftar item di checkout bisa diubah jumlahnya atau dihapus (dengan konfirmasi), dilengkapi subtotal otomatis, dan batas stok. Tidak ada menu Keranjang di navigasi.
- **Checkout & Simulasi Pembayaran**: Formulir pemesanan tervalidasi dengan opsi Transfer Bank (BCA/Mandiri/BRI), E-Wallet (GoPay/OVO/ShopeePay), dan Cash on Delivery (COD).
- **Admin Dashboard & CRUD Inventaris**:
  - Statistik Ringkasan (6 KPI: Produk, Kategori, Pesanan, Pendapatan, Pelanggan, Stok Menipis).
  - 3 Grafik Interaktif Chart.js (Tren Penjualan Bulanan, Status Pesanan, Distribusi Kategori).
  - Tambah, Lihat, Edit, dan Hapus Produk serta Kategori.
  - Perubahan status pesanan (*Pending, Processing, Shipped, Completed, Cancelled*).
  - Ekspor data produk dan pesanan ke file CSV berstandar RFC 4180 dengan UTF-8 BOM.
- **Status Pesanan (My Order)**: Garis progres berikon (Dibuat → Diproses → Dikirim → Selesai) untuk tiap pesanan, pencarian lewat nomor pesanan, daftar pesanan akun, dan pembatalan pesanan yang masih *Pending* (stok dikembalikan).
- **Simulasi Autentikasi Pengguna & Role Guard**: Role Admin (akses dashboard penuh) dan Role Customer (akses belanja dan pesanan). Dashboard tidak ditampilkan di navigasi publik; admin masuk lewat `login.html`, lalu membukanya dari menu akun.
- **Konsultan Kulit AI (Assistant)**: Asisten diagnosis jenis kulit bertahap dan pencarian bahasa alami dengan pencocokan produk katalog tanpa memerlukan API key eksternal.
- **Tampilan Terang**: Mode gelap sudah dihapus agar tampilan konsisten.
- **Produk Favorit**: Ikon hati pada produk menandai favorit; ikon tas di navigasi membuka panel yang hanya berisi produk yang di-like (bisa langsung Pesan atau Hapus).

---

## 5. Website Page Descriptions

**Navigasi tetap (4 menu tanpa dropdown, dibuat oleh `js/layout.js`):** Home · Produk · About · My Order. Di kanan: pencarian, ikon favorit, dan tombol Login (berubah menjadi nama pengguna setelah masuk).

### Halaman 1: Home (`index.html`)
Hero section, **banner promo berupa carousel** (Konsultasi AI, Cek Status Pesanan; otomatis berganti dan bisa digeser), serta produk unggulan (*Featured Products*).

### Halaman 2: Produk (`catalog.html`)
Pusat eksplorasi produk dengan filter gabungan: 8 kategori, 5 jenis kulit, rentang harga, live search, dan 4 metode pengurutan. Menampilkan *empty state* yang informatif jika filter tidak menghasilkan produk.

### Halaman 3: Detail Produk (`product.html`)
Foto produk, brand, harga, stok aktual, stepper kuantitas yang terkontrol stok, tombol *Pesan Sekarang*, tombol *Simpan ke Wishlist*, deskripsi formula aktif, dan produk terkait.

### Halaman 4: About (`about.html`)
Tiga bagian yang dapat dibuka dari dropdown menu About: **Sejarah Toko** (linimasa), **Lokasi** (alamat, jam buka, peta OpenStreetMap), dan **Contact** (email, telepon, form pesan dengan validasi dan penyimpanan Local Storage `skinora_messages`).

### Halaman 5: My Order > Status Pesanan (`pesanan.html`)
Garis progres berikon yang menunjukkan tahap paket (Dibuat, Diproses, Dikirim, Selesai; horizontal di desktop, vertikal di mobile). Pelanggan yang login melihat daftar pesanannya; siapa pun bisa melacak lewat nomor pesanan (contoh demo: `SKN-202611-89F1`). Pesanan *Pending* dapat dibatalkan. Status berubah ketika admin memperbaruinya di dashboard.

### Halaman 6: Checkout (`cart.html`)
Dibuka lewat tombol *Pesan*. Daftar item dengan kontrol jumlah dan formulir checkout tervalidasi (telepon, email, kode pos, alamat, metode pembayaran simulasi). Setelah pesanan dibuat, pengguna diarahkan ke halaman Status Pesanan.

### Halaman 7: Admin Dashboard (`dashboard.html`)
Portal pengelola toko dengan proteksi role admin (tidak ada di navigasi publik). 6 kartu KPI, 3 grafik Chart.js, CRUD produk dan kategori, pembaruan status pesanan, dan ekspor CSV.

### Halaman 8: Masuk & Daftar Akun (`login.html` & `register.html`)
Validasi format email, nomor WhatsApp, dan kecocokan kata sandi, dengan tombol isi kredensial demo admin.

---

## 6. Struktur Kategori & Jenis Kulit (Distribusi 49 Produk)

Foto produk berasal dari tim. Nama dan brand mengikuti kemasan pada foto. **Harga, stok, dan rating adalah data contoh** yang perlu disesuaikan. Jenis kulit mengikuti klaim pada kemasan bila ada; produk tanpa klaim jenis kulit diberi label *Semua Jenis Kulit* dan muncul di setiap filter jenis kulit.

| No | Kategori | Jenis Kulit | Kode Produk | Nama Produk | Brand | Harga (IDR) |
|---|---|---|---|---|---|---|
| 1 | Cleanser | Kombinasi | CLN-001 | 5X Ceramide Low pH Cleanser | Skintific | Rp 99.000 |
| 2 | Cleanser | Semua Jenis Kulit | CLN-002 | 5X Ceramide Barrier Micellar Water | Skintific | Rp 119.000 |
| 3 | Cleanser | Semua Jenis Kulit | CLN-003 | Brightening Micellar Water Peach + Niacinamide | Glad2Glow | Rp 59.000 |
| 4 | Cleanser | Semua Jenis Kulit | CLN-004 | Mugwort Salicylic Acid Acne Clear Micellar Water | Glad2Glow | Rp 59.000 |
| 5 | Cleanser | Semua Jenis Kulit | CLN-005 | Cherry Blossom Betaine Micellar Water | Glad2Glow | Rp 59.000 |
| 6 | Cleanser | Berminyak | CLN-006 | Shirojyun Ultimate Whitening Face Wash | Hada Labo | Rp 49.000 |
| 7 | Cleanser | Kering | CLN-007 | Gokujyun Ultimate Moisturizing Face Wash | Hada Labo | Rp 49.000 |
| 8 | Toner | Kering | TNR-001 | Radiance Glow Serum Spray | Glad2Glow | Rp 79.000 |
| 9 | Serum | Kombinasi | SRM-001 | PDRN Bright & Smooth Serum | Skintific | Rp 149.000 |
| 10 | Serum | Berjerawat | SRM-002 | 2% Salicylic Acid Anti-Acne Serum | Skintific | Rp 139.000 |
| 11 | Serum | Sensitif | SRM-003 | 5X Ceramide Barrier Serum | Skintific | Rp 149.000 |
| 12 | Serum | Berjerawat | SRM-004 | Centella Salicylic Acid Power Acne Serum | Glad2Glow | Rp 69.000 |
| 13 | Serum | Kombinasi | SRM-005 | Perfect Vita C Bright Glow Serum | Glad2Glow | Rp 59.000 |
| 14 | Serum | Berminyak | SRM-006 | Pomegranate 10% Niacinamide Power Bright Serum | Glad2Glow | Rp 69.000 |
| 15 | Moisturizer | Sensitif | MOI-001 | 5X Ceramide Barrier Moisture Gel | Skintific | Rp 129.000 |
| 16 | Sunscreen | Berminyak | SUN-001 | UV Shield Airy Smooth Sunscreen Serum SPF 50 PA++++ | Wardah | Rp 59.000 |
| 17 | Sunscreen | Berjerawat | SUN-002 | UV Shield Acne Calming Sunscreen Moisturizer SPF 50 PA++++ | Wardah | Rp 59.000 |
| 18 | Masker | Kombinasi | MSK-001 | Niacinamide Bright Boost Clay Stick | Skintific | Rp 99.000 |
| 19 | Masker | Berjerawat | MSK-002 | Mugwort Acne Clay Stick | Skintific | Rp 99.000 |
| 20 | Masker | Berminyak | MSK-003 | Alaska Volcano Pore Clay Stick | Skintific | Rp 99.000 |
| 21 | Makeup | Semua Jenis Kulit | MKP-001 | Tintdorable Blurry Tint - Burgundy | Hanasui | Rp 49.000 |
| 22 | Makeup | Semua Jenis Kulit | MKP-002 | Tintdorable Blurry Tint - Terracotta | Hanasui | Rp 49.000 |
| 23 | Makeup | Semua Jenis Kulit | MKP-003 | Tintdorable Blurry Tint - Chocolate | Hanasui | Rp 49.000 |
| 24 | Makeup | Semua Jenis Kulit | MKP-004 | Tintdorable Blurry Tint - Coral Rose | Hanasui | Rp 49.000 |
| 25 | Makeup | Semua Jenis Kulit | MKP-005 | Tintdorable Blurry Tint - Soft Rose | Hanasui | Rp 49.000 |
| 26 | Makeup | Berminyak | MKP-006 | Perfect Stay Serum Matte Cushion Foundation SPF 50 PA++++ | Skintific | Rp 159.000 |
| 27 | Makeup | Kering | MKP-007 | Cover Glow Perfect Cushion | Skintific | Rp 179.000 |
| 28 | Makeup | Berminyak | MKP-008 | Perfect Stay Velvet Matte Cushion | Skintific | Rp 169.000 |
| 29 | Makeup | Semua Jenis Kulit | MKP-009 | Blurring Skin Tint | Glad2Glow | Rp 89.000 |
| 30 | Makeup | Semua Jenis Kulit | MKP-010 | Highlight & Contour Palette 01 | Judydoll | Rp 169.000 |
| 31 | Makeup | Semua Jenis Kulit | MKP-011 | Next Level Bouncy Blush - Berry | Hanasui | Rp 59.000 |
| 32 | Makeup | Semua Jenis Kulit | MKP-012 | Next Level Bouncy Blush - Peach | Hanasui | Rp 59.000 |
| 33 | Makeup | Semua Jenis Kulit | MKP-013 | Next Level Bouncy Blush - Mauve | Hanasui | Rp 59.000 |
| 34 | Makeup | Semua Jenis Kulit | MKP-014 | Tintdorable Lip Stain - Cocoa Nude | Hanasui | Rp 45.000 |
| 35 | Makeup | Semua Jenis Kulit | MKP-015 | Tintdorable Lip Stain - Fuchsia | Hanasui | Rp 45.000 |
| 36 | Makeup | Semua Jenis Kulit | MKP-016 | Tintdorable Lip Stain - Soft Nude | Hanasui | Rp 45.000 |
| 37 | Makeup | Kering | MKP-017 | Get a Grip Makeup Setting Spray - Hydro | Dazzle Me | Rp 79.000 |
| 38 | Makeup | Kering | MKP-018 | All Day Glow Setting Spray | Glad2Glow | Rp 89.000 |
| 39 | Makeup | Semua Jenis Kulit | MKP-019 | Cover Fit Serum Cushion | Glowsophy | Rp 139.000 |
| 40 | Makeup | Berminyak | MKP-020 | Get a Grip Makeup Setting Spray - Matte Fix | Dazzle Me | Rp 79.000 |
| 41 | Makeup | Kering | MKP-021 | Cover Glow Serum Cushion | Glowsophy | Rp 139.000 |
| 42 | Makeup | Kombinasi | MKP-022 | Get a Grip Makeup Setting Spray - Dewy Fix | Dazzle Me | Rp 79.000 |
| 43 | Makeup | Berminyak | MKP-023 | All Day Matte Setting Spray | Glad2Glow | Rp 89.000 |
| 44 | Bundle | Semua Jenis Kulit | BDL-001 | Next Level Bouncy Blush Duo Set | Hanasui | Rp 105.000 |
| 45 | Bundle | Semua Jenis Kulit | BDL-002 | Tintdorable Lip Stain Duo Set | Hanasui | Rp 79.000 |
| 46 | Bundle | Semua Jenis Kulit | BDL-003 | Tintdorable Blurry Tint Duo Set | Hanasui | Rp 89.000 |
| 47 | Bundle | Berjerawat | BDL-004 | Clay Care Set | Skintific | Rp 259.000 |
| 48 | Bundle | Semua Jenis Kulit | BDL-005 | All Day Glow Set | Glad2Glow | Rp 299.000 |
| 49 | Bundle | Sensitif | BDL-006 | Barrier Care Set | Skintific | Rp 429.000 |

---

## 7. Project Folder Structure

```
SKINORA/
│
├── index.html                  # Halaman Beranda
├── catalog.html                # Halaman Katalog Produk & Filter
├── product.html                # Halaman Rincian Produk
├── about.html                  # About: Sejarah Toko, Lokasi, Contact
├── pesanan.html                # My Order: Status Pesanan (garis progres)
├── cart.html                   # Halaman Checkout
├── dashboard.html              # Halaman Admin Dashboard
├── login.html                  # Halaman Masuk Akun
├── register.html               # Halaman Pendaftaran Akun
│
├── css/
│   ├── style.css               # Tema Master Pink & White, Variabel CSS, Card, Tipografi
│   ├── responsive.css          # Breakpoint Mobile, Tablet, dan Drawer Navigasi
│   └── dashboard.css           # Styling Khusus Tabel, Sidebar, dan Status Badges Admin
│
├── js/
│   ├── data.js                 # Dataset Awal: 49 Produk, 8 Kategori, Akun Demo, Sample Order
│   ├── storage.js              # Manajemen Local Storage & Fallback Seeding
│   ├── notifications.js        # Wrapper SweetAlert2 & Toast Notifikasi
│   ├── validation.js           # Validasi Klien Formulir Checkout, Auth, dan Produk
│   ├── theme.js                # Pengelola Mode Terang / Gelap (Dark Mode)
│   ├── auth.js                 # Otentikasi Sesi Simulasi & Route Guard Admin
│   ├── products.js             # Operasi CRUD Produk & Kategori
│   ├── catalog.js              # Kontroler Filter Dinamis, Pencarian, & Sorting
│   ├── product-detail.js       # Kontroler Halaman Detail Produk & Related Grid
│   ├── layout.js               # Navigasi bersama (Home, Produk, About, My Order)
│   ├── pesanan.js              # Kontroler Status Pesanan & garis progres
│   ├── cart.js                 # Daftar item checkout, penghitungan total, Pesan langsung
│   ├── wishlist.js             # Kontroler Daftar Keinginan & Sinkronisasi Heart
│   ├── orders.js               # Manajemen Order & Agregasi Statistik Dashboard
│   ├── checkout.js             # Kontroler Formulir Checkout & Simulasi Bayar
│   ├── dashboard.js            # Kontroler Admin Dashboard, Modal CRUD, Status Pesanan
│   ├── charts.js               # Visualisasi Grafik Penjualan & Analitik Chart.js
│   ├── csv-export.js           # Generator File CSV Produk & Pesanan (UTF-8 BOM)
│   ├── assistant.js            # Widget Konsultan Kecantikan AI Berbasis Aturan
│   └── app.js                  # Bootstrapping Global, Modal Search, dan Drawer Mobile
│
├── assets/
│   ├── images/
│   │   ├── products/           # Direktori 49 foto produk (.jpg)
│   │   ├── banners/            # Banner Hero
│   │   └── icons/              # Aset Ikon Pendukung
│   └── logo/
│       └── skinora-logo.svg    # Monogram Vektor & Wordmark Brand SKINORA
│
├── README.md                   # Dokumentasi Lengkap Proyek
└── scripts/generate-placeholders.js   # (opsional) pembuat gambar placeholder
```

---

## 8. Installation & Running Instructions

### Menjalankan Website
Proyek ini murni **HTML5, CSS3, dan Vanilla JavaScript** (tanpa Node, build, atau framework). Cukup:
1. Buka folder proyek di VS Code, klik kanan `index.html` lalu pilih **Open with Live Server**, atau
2. klik ganda `index.html` di browser.

Koneksi internet dibutuhkan untuk memuat Tailwind CDN, Font Awesome, SweetAlert2, Chart.js, dan Google Fonts.

---

## 9. Demo Admin Credentials

Dashboard tidak ada di menu navigasi publik. Masuk lewat `login.html` dengan akun berikut, lalu Anda diarahkan ke `dashboard.html` (atau buka dari menu akun):

- **URL Login:** `login.html`
- **Email:** `admin@skinora.com`
- **Password:** `admin123`
- **Peran:** Administrator (Akses Penuh Manajemen Inventaris, Pesanan, Kategori, & Ekspor CSV)

Tersedia juga akun demo pelanggan:
- **Email:** `siti@example.com`
- **Password:** `password123`
- **Peran:** Pelanggan (Customer)

---

## 10. Local Storage Architecture

Aplikasi menggunakan key penyimpanan terstruktur pada `localStorage`:

| Key Storage | Tipe Data | Deskripsi |
|---|---|---|
| `skinora_products` | `Array<Object>` | Menyimpan 49 data produk katalog beserta perubahan CRUD admin |
| `skinora_categories` | `Array<Object>` | Menyimpan 8 kategori produk aktif |
| `skinora_users` | `Array<Object>` | Menyimpan akun pengguna terdaftar (Admin & Customer) |
| `skinora_session` | `Object / null` | Menyimpan sesi pengguna yang sedang aktif saat ini |
| `skinora_cart` | `Array<Object>` | Menyimpan daftar barang yang akan dipesan di halaman checkout |
| `skinora_messages` | `Array<Object>` | Menyimpan pesan dari form Contact di halaman About |
| `skinora_wishlist` | `Array<String>` | Menyimpan array ID produk yang disimpan ke wishlist |
| `skinora_orders` | `Array<Object>` | Menyimpan seluruh riwayat transaksi pesanan pelanggan |
| `skinora_theme` | `String` | Menyimpan preferensi tema (`'light'` atau `'dark'`) |

*Catatan: Sistem menyertakan mekanisme auto-seeding pada file `js/storage.js` yang akan otomatis memuat 49 produk awal (dan memperbarui data lama lewat `DATA_VERSION`) jika penyimpanan lokal browser pengguna masih kosong.*

---

## 11. Screenshots Section (Dokumentasi Tampilan)

> *Instruksi Pengambilan Tangkapan Layar: Jalankan aplikasi di browser, buka masing-masing halaman, dan simpan tangkapan layar ke folder `assets/screenshots/`.*

1. **[Screenshot Placeholder 1]: Beranda (Homepage - Hero & Featured Section)**  
   *Menampilkan navigasi Pink & White, headline hero, dan showcase 4 produk unggulan.*

2. **[Screenshot Placeholder 2]: Katalog Produk & Filter Multi-Kriteria**  
   *Menampilkan sidebar filter 8 kategori, 5 jenis kulit, rentang harga, dan grid 49 produk responsif.*

3. **[Screenshot Placeholder 3]: Halaman Detail Produk (PDP)**  
   *Menampilkan gambar besar produk, stepper kuantitas, status stok, tombol Pesan Sekarang, dan related products.*

4. **[Screenshot Placeholder 4]: Checkout & Formulir Pemesanan**  
   *Menampilkan tabel item belanja, validasi formulir pelanggan, dan pilihan metode pembayaran.*

5. **[Screenshot Placeholder 5]: Admin Dashboard & Visualisasi Chart.js**  
   *Menampilkan 6 kartu KPI, grafik analitik penjualan bulanan, status pesanan, dan tabel CRUD produk.*

6. **[Screenshot Placeholder 6]: Widget Konsultan AI & Mode Gelap (Dark Mode)**  
   *Menampilkan jendela konsultasi cerdas dan kontras palet warna mewah pada mode gelap.*

---

## 12. Deployment Instructions

### A. Deploy ke GitHub Pages
1. Buat repositori baru di GitHub dengan nama `skinora-ecommerce`.
2. Push seluruh file proyek ke branch `main`.
3. Buka menu **Settings** > **Pages** pada repositori GitHub Anda.
4. Pada bagian **Build and deployment**, pilih Source: **Deploy from a branch**, lalu pilih branch `main` dan folder `/ (root)`.
5. Klik **Save**. Dalam 1–2 menit, website SKINORA Anda akan aktif pada tautan `https://<username>.github.io/skinora-ecommerce/`.

### B. Deploy ke Netlify
1. Login ke akun [Netlify](https://www.netlify.com/).
2. Tarik dan lepas (*drag & drop*) folder proyek SKINORA ke dashboard Netlify Drop, **atau** hubungkan repositori Git Anda.
3. Kosongkan build command dan isi publish directory dengan `.` (root proyek).
4. Klik **Deploy Site**. Website Anda siap diakses secara instan dengan domain SSL gratis.

---

## 13. Group Member Contribution Section

Proyek ini disusun dan dikembangkan oleh Tim 5 Mahasiswa:

1. **Mahasiswa 1 (Lead Developer & Software Architecture)**:  
   Perancangan arsitektur sistem, implementasi Vanilla JavaScript, logika bisnis Local Storage, validasi formulir klien, integrasi Chart.js, ekspor CSV, dan unit testing.
2. **Mahasiswa 2 (UI/UX Designer & Product Assets)**:  
   Perancangan identitas visual luxury pink-and-white, penyusunan direktori aset gambar produk (`assets/images/products/`), tipografi, dan mockup antarmuka.
3. **Mahasiswa 3 (Frontend Developer - Catalog & Filters)**:  
   Pengembangan halaman katalog produk, implementasi algoritma pencarian dinamis, filter gabungan 8 kategori & 5 jenis kulit, dan penataan kartu produk.
4. **Mahasiswa 4 (Frontend Developer - Cart & Checkout System)**:  
   Pengembangan alur pesan langsung dan checkout, stock clamping logic, simulasi pembayaran, kalkulasi biaya ongkir, dan konfirmasi pesanan SweetAlert2.
5. **Mahasiswa 5 (Quality Assurance & Documentation)**:  
   Penyusunan dataset 49 produk, pengujian responsivitas pada perangkat mobile dan tablet, verifikasi bug, serta dokumentasi komprehensif README.md.

---

## 14. Compliance & Verification Checklist

- [x] 100% Menggunakan **HTML5, CSS3, dan Vanilla JavaScript** tanpa framework (React/Vue/Angular).
- [x] Tepat **7 Kategori Produk** (Cleanser, Toner, Serum, Moisturizer, Sunscreen, Masker, Makeup).
- [x] Tepat **5 Produk per Kategori** untuk **5 Jenis Kulit** (Berminyak, Kering, Kombinasi, Sensitif, Berjerawat).
- [x] Total **49 Produk Awal** dengan foto asli, deskripsi dari kemasan, serta harga, stok, dan rating contoh yang perlu disesuaikan.
- [x] Direktori aset gambar produk terorganisasi: `assets/images/products/<category>-<skin>.jpg`.
- [x] Delapan tampilan halaman berfungsi penuh (`index`, `catalog`, `product`, `about`, `pesanan`, `cart`, `dashboard`, `login`/`register`).
- [x] Operasi CRUD produk dan kategori pada Admin Dashboard berfungsi menyeluruh.
- [x] Visualisasi 3 grafik interaktif menggunakan **Chart.js**.
- [x] Fitur ekspor data produk dan pesanan ke format **CSV**.
- [x] Validasi formulir interaktif di sisi klien menggunakan JavaScript murni.
- [x] Konsultan Kulit AI mandiri (*rule-based fallback*) tanpa kebutuhan API key eksternal.
- [x] Fitur Mode Gelap (*Dark Mode*) dengan penyimpanan preferensi di Local Storage.
- [x] Fitur Daftar Keinginan (*Wishlist*) dengan tombol hati interaktif dan transfer ke checkout.
- [x] Unit testing murni berhasil lulus 100% (`node:test`).
