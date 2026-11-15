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
2. Membangun sistem katalog produk komprehensif dengan **35 produk awal** yang terdistribusi secara seimbang ke dalam **7 kategori produk** dan **5 jenis kulit unik**.
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

- **Katalog 35 Produk Multi-Kriteria**: Filter pencarian instan (nama, brand, deskripsi), 7 kategori, 5 jenis kulit, rentang harga, rating, ketersediaan stok, dan 5 metode pengurutan.
- **Pesan Langsung & Checkout**: Tombol *Pesan* di kartu produk dan halaman detail langsung membuka halaman checkout. Daftar item di checkout bisa diubah jumlahnya atau dihapus (dengan konfirmasi), dilengkapi subtotal otomatis, batas stok, dan bilah progres *Gratis Ongkir* (target Rp 200.000). Tidak ada menu Keranjang di navigasi.
- **Checkout & Simulasi Pembayaran**: Formulir pemesanan tervalidasi dengan opsi Transfer Bank (BCA/Mandiri/BRI), E-Wallet (GoPay/OVO/ShopeePay), dan Cash on Delivery (COD).
- **Admin Dashboard & CRUD Inventaris**:
  - Statistik Ringkasan (6 KPI: Produk, Kategori, Pesanan, Pendapatan, Pelanggan, Stok Menipis).
  - 3 Grafik Interaktif Chart.js (Tren Penjualan Bulanan, Status Pesanan, Distribusi Kategori).
  - Tambah, Lihat, Edit, dan Hapus Produk serta Kategori.
  - Perubahan status pesanan (*Pending, Processing, Shipped, Completed, Cancelled*).
  - Ekspor data produk dan pesanan ke file CSV berstandar RFC 4180 dengan UTF-8 BOM.
- **Status Pesanan (Pesanan Saya)**: Garis progres berikon (Dibuat → Diproses → Dikirim → Selesai) untuk tiap pesanan, pencarian lewat nomor pesanan, daftar pesanan akun, dan pembatalan pesanan yang masih *Pending* (stok dikembalikan).
- **Simulasi Autentikasi Pengguna & Role Guard**: Role Admin (akses dashboard penuh) dan Role Customer (akses belanja dan pesanan). Dashboard tidak ditampilkan di navigasi publik; admin masuk lewat `login.html`, lalu membukanya dari menu akun.
- **Konsultan Kulit AI (Assistant)**: Asisten diagnosis jenis kulit bertahap dan pencarian bahasa alami dengan pencocokan produk katalog tanpa memerlukan API key eksternal.
- **Tampilan Terang**: Mode gelap sudah dihapus agar tampilan konsisten.
- **Produk Favorit**: Ikon hati pada produk menandai favorit; ikon tas di navigasi membuka panel yang hanya berisi produk yang di-like (bisa langsung Pesan atau Hapus).

---

## 5. Website Page Descriptions

**Navigasi tetap (4 menu tanpa dropdown, dibuat oleh `js/layout.js`):** Home · Produk · About · Pesanan Saya. Di kanan: pencarian, ikon favorit, dan tombol Login (berubah menjadi nama pengguna setelah masuk).

### Halaman 1: Home (`index.html`)
Hero section, **banner promo berupa carousel** (Gratis Ongkir, Konsultasi AI, Cek Status Pesanan; otomatis berganti dan bisa digeser), serta produk unggulan (*Featured Products*).

### Halaman 2: Produk (`catalog.html`)
Pusat eksplorasi produk dengan filter gabungan: 7 kategori, 5 jenis kulit, rentang harga, rating minimum, ketersediaan stok, live search, dan 5 metode pengurutan. Menampilkan *empty state* yang informatif jika filter tidak menghasilkan produk.

### Halaman 3: Detail Produk (`product.html`)
Foto produk, brand, harga, stok aktual, stepper kuantitas yang terkontrol stok, tombol *Pesan Sekarang*, tombol *Simpan ke Wishlist*, deskripsi formula aktif, dan produk terkait.

### Halaman 4: About (`about.html`)
Tiga bagian yang dapat dibuka dari dropdown menu About: **Sejarah Toko** (linimasa), **Lokasi** (alamat, jam buka, peta OpenStreetMap), dan **Contact** (email, telepon, form pesan dengan validasi dan penyimpanan Local Storage `skinora_messages`).

### Halaman 5: Pesanan Saya > Status Pesanan (`pesanan.html`)
Garis progres berikon yang menunjukkan tahap paket (Dibuat, Diproses, Dikirim, Selesai; horizontal di desktop, vertikal di mobile). Pelanggan yang login melihat daftar pesanannya; siapa pun bisa melacak lewat nomor pesanan (contoh demo: `SKN-202611-89F1`). Pesanan *Pending* dapat dibatalkan. Status berubah ketika admin memperbaruinya di dashboard.

### Halaman 6: Checkout (`cart.html`)
Dibuka lewat tombol *Pesan*. Daftar item dengan kontrol jumlah, bilah progres gratis ongkir, dan formulir checkout tervalidasi (telepon, email, kode pos, alamat, metode pembayaran simulasi). Setelah pesanan dibuat, pengguna diarahkan ke halaman Status Pesanan.

### Halaman 7: Admin Dashboard (`dashboard.html`)
Portal pengelola toko dengan proteksi role admin (tidak ada di navigasi publik). 6 kartu KPI, 3 grafik Chart.js, CRUD produk dan kategori, pembaruan status pesanan, dan ekspor CSV.

### Halaman 8: Masuk & Daftar Akun (`login.html` & `register.html`)
Validasi format email, nomor WhatsApp, dan kecocokan kata sandi, dengan tombol isi kredensial demo admin.

---

## 6. Struktur Kategori & Jenis Kulit (Distribusi 35 Produk)

| No | Kategori | Jenis Kulit | Kode Produk | Nama Produk | Harga (IDR) |
|---|---|---|---|---|---|
| 1 | Cleanser | Berminyak | CLN-001 | Purifying Tea Tree Foaming Gel | Rp 139.000 |
| 2 | Cleanser | Kering | CLN-002 | Hydrating Ceramide Milky Cleanser | Rp 149.000 |
| 3 | Cleanser | Kombinasi | CLN-003 | Balancing Green Tea Gel Wash | Rp 135.000 |
| 4 | Cleanser | Sensitif | CLN-004 | Ultra-Calming Oat Barrier Cleanser | Rp 159.000 |
| 5 | Cleanser | Berjerawat | CLN-005 | Acne Relief Salicylic Gentle Foam | Rp 145.000 |
| 6 | Toner | Berminyak | TNR-001 | Pore Clarifying Witch Hazel Toner | Rp 129.000 |
| 7 | Toner | Kering | TNR-002 | Deep Moisture Hyaluronic Essence Toner | Rp 165.000 |
| 8 | Toner | Kombinasi | TNR-003 | Dual Action Balancing Hydrosol | Rp 145.000 |
| 9 | Toner | Sensitif | TNR-004 | Centella Soothing Calming Tonic | Rp 155.000 |
| 10 | Toner | Berjerawat | TNR-005 | Clarifying BHA Pore Refining Toner | Rp 159.000 |
| 11 | Serum | Berminyak | SRM-001 | Niacinamide 10% + Zinc Sebum Serum | Rp 189.000 |
| 12 | Serum | Kering | SRM-002 | Multi-Molecular Hyaluronic Hydrating Booster | Rp 225.000 |
| 13 | Serum | Kombinasi | SRM-003 | Radiance Peptide & Vitamin C Fluid | Rp 215.000 |
| 14 | Serum | Sensitif | SRM-004 | Barrier Recovery Ceramide Complex | Rp 235.000 |
| 15 | Serum | Berjerawat | SRM-005 | Intensive Acne BHA + Centella Ampoule | Rp 199.000 |
| 16 | Moisturizer | Berminyak | MOI-001 | Oil-Free Water Gel Mattifying Cream | Rp 169.000 |
| 17 | Moisturizer | Kering | MOI-002 | Rich Shea & Ceramide Barrier Cream | Rp 195.000 |
| 18 | Moisturizer | Kombinasi | MOI-003 | Dewy Hydrating Gel-Cream Infusion | Rp 179.000 |
| 19 | Moisturizer | Sensitif | MOI-004 | Ultra-Gentle Soothing Comfort Balm | Rp 189.000 |
| 20 | Moisturizer | Berjerawat | MOI-005 | Blemish Calm Lightweight Lotion | Rp 175.000 |
| 21 | Sunscreen | Berminyak | SUN-001 | Matte Velvet Airy Sunscreen SPF 50+ | Rp 175.000 |
| 22 | Sunscreen | Kering | SUN-002 | Hydra Glow Moisture Sun Milk SPF 50+ | Rp 185.000 |
| 23 | Sunscreen | Kombinasi | SUN-003 | Invisible Fluid Daily Shield SPF 50+ | Rp 169.000 |
| 24 | Sunscreen | Sensitif | SUN-004 | 100% Mineral Physical Sunscreen SPF 50+ | Rp 199.000 |
| 25 | Sunscreen | Berjerawat | SUN-005 | Non-Comedogenic Acne Sun Shield SPF 45 | Rp 165.000 |
| 26 | Masker | Berminyak | MSK-001 | Volcanic Clay Deep Pore Detox Mask | Rp 125.000 |
| 27 | Masker | Kering | MSK-002 | Rose Collagen Overnight Sleeping Mask | Rp 169.000 |
| 28 | Masker | Kombinasi | MSK-003 | Multi-Balancing Sheet Mask (5-Pack) | Rp 99.000 |
| 29 | Masker | Sensitif | MSK-004 | Calendula Hydrogel Calming Mask | Rp 139.000 |
| 30 | Masker | Berjerawat | MSK-005 | Tea Tree & Sulfur Clarifying Clay Mask | Rp 135.000 |
| 31 | Makeup | Berminyak | MKP-001 | Poreless Matte Velvet Cushion SPF 35 | Rp 219.000 |
| 32 | Makeup | Kering | MKP-002 | Dewy Luminous Serum Tint Foundation | Rp 235.000 |
| 33 | Makeup | Kombinasi | MKP-003 | Natural Balance Satin Skin Tint | Rp 209.000 |
| 34 | Makeup | Sensitif | MKP-004 | Hypoallergenic Calming BB Cream | Rp 225.000 |
| 35 | Makeup | Berjerawat | MKP-005 | Acne-Safe Mineral Powder Foundation | Rp 195.000 |

---

## 7. Project Folder Structure

```
SKINORA/
│
├── index.html                  # Halaman Beranda
├── catalog.html                # Halaman Katalog Produk & Filter
├── product.html                # Halaman Rincian Produk
├── about.html                  # About: Sejarah Toko, Lokasi, Contact
├── pesanan.html                # Pesanan Saya: Status Pesanan (garis progres)
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
│   ├── data.js                 # Dataset Awal: 35 Produk, 7 Kategori, Akun Demo, Sample Order
│   ├── storage.js              # Manajemen Local Storage & Fallback Seeding
│   ├── notifications.js        # Wrapper SweetAlert2 & Toast Notifikasi
│   ├── validation.js           # Validasi Klien Formulir Checkout, Auth, dan Produk
│   ├── theme.js                # Pengelola Mode Terang / Gelap (Dark Mode)
│   ├── auth.js                 # Otentikasi Sesi Simulasi & Route Guard Admin
│   ├── products.js             # Operasi CRUD Produk & Kategori
│   ├── catalog.js              # Kontroler Filter Dinamis, Pencarian, & Sorting
│   ├── product-detail.js       # Kontroler Halaman Detail Produk & Related Grid
│   ├── layout.js               # Navigasi bersama (Home, Produk, About, Pesanan Saya)
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
│   │   ├── products/           # Direktori 35 File Gambar Placeholder Produk (.jpg & .svg)
│   │   ├── banners/            # Banner Hero dan Promo Resolusi Tinggi
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
| `skinora_products` | `Array<Object>` | Menyimpan 35 data produk katalog beserta perubahan CRUD admin |
| `skinora_categories` | `Array<Object>` | Menyimpan 7 kategori produk aktif |
| `skinora_users` | `Array<Object>` | Menyimpan akun pengguna terdaftar (Admin & Customer) |
| `skinora_session` | `Object / null` | Menyimpan sesi pengguna yang sedang aktif saat ini |
| `skinora_cart` | `Array<Object>` | Menyimpan daftar barang yang akan dipesan di halaman checkout |
| `skinora_messages` | `Array<Object>` | Menyimpan pesan dari form Contact di halaman About |
| `skinora_wishlist` | `Array<String>` | Menyimpan array ID produk yang disimpan ke wishlist |
| `skinora_orders` | `Array<Object>` | Menyimpan seluruh riwayat transaksi pesanan pelanggan |
| `skinora_theme` | `String` | Menyimpan preferensi tema (`'light'` atau `'dark'`) |

*Catatan: Sistem menyertakan mekanisme auto-seeding pada file `js/storage.js` yang akan otomatis memuat 35 produk awal jika penyimpanan lokal browser pengguna masih kosong.*

---

## 11. Screenshots Section (Dokumentasi Tampilan)

> *Instruksi Pengambilan Tangkapan Layar: Jalankan aplikasi di browser, buka masing-masing halaman, dan simpan tangkapan layar ke folder `assets/screenshots/`.*

1. **[Screenshot Placeholder 1]: Beranda (Homepage - Hero & Featured Section)**  
   *Menampilkan navigasi Pink & White, banner promo, headline hero, dan showcase 4 produk unggulan.*

2. **[Screenshot Placeholder 2]: Katalog Produk & Filter Multi-Kriteria**  
   *Menampilkan sidebar filter 7 kategori, 5 jenis kulit, rentang harga, dan grid 35 produk responsif.*

3. **[Screenshot Placeholder 3]: Halaman Detail Produk (PDP)**  
   *Menampilkan gambar besar produk, stepper kuantitas, status stok, tombol Pesan Sekarang, dan related products.*

4. **[Screenshot Placeholder 4]: Checkout & Formulir Pemesanan**  
   *Menampilkan tabel item belanja, bilah batas gratis ongkir, validasi formulir pelanggan, dan pilihan metode pembayaran.*

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
   Pengembangan halaman katalog produk, implementasi algoritma pencarian dinamis, filter gabungan 7 kategori & 5 jenis kulit, dan penataan kartu produk.
4. **Mahasiswa 4 (Frontend Developer - Cart & Checkout System)**:  
   Pengembangan alur pesan langsung dan checkout, stock clamping logic, simulasi pembayaran, kalkulasi biaya ongkir, dan konfirmasi pesanan SweetAlert2.
5. **Mahasiswa 5 (Quality Assurance & Documentation)**:  
   Penyusunan dataset 35 produk, pengujian responsivitas pada perangkat mobile dan tablet, verifikasi bug, serta dokumentasi komprehensif README.md.

---

## 14. Compliance & Verification Checklist

- [x] 100% Menggunakan **HTML5, CSS3, dan Vanilla JavaScript** tanpa framework (React/Vue/Angular).
- [x] Tepat **7 Kategori Produk** (Cleanser, Toner, Serum, Moisturizer, Sunscreen, Masker, Makeup).
- [x] Tepat **5 Produk per Kategori** untuk **5 Jenis Kulit** (Berminyak, Kering, Kombinasi, Sensitif, Berjerawat).
- [x] Total **35 Produk Awal Terverifikasi** dengan data harga realistis (IDR), deskripsi, dan stok.
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
