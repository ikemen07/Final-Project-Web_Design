/**
 * SKINORA Data Specification
 * 49 produk nyata (foto dari tim) di 8 kategori. Jenis kulit: 5 jenis + 'Semua Jenis Kulit'
 * Initial seed data for Local Storage architecture
 */

const INITIAL_CATEGORIES = [
  { id: 'cleanser', name: 'Cleanser', description: 'Pembersih wajah lembut mengangkat kotoran tanpa merusak skin barrier', icon: 'fa-soap' },
  { id: 'toner', name: 'Toner', description: 'Penyegar penyeimbang pH kulit dan persiapan penyerapan nutrisi', icon: 'fa-spray-can-sparkles' },
  { id: 'serum', name: 'Serum', description: 'Konsentrat aktif berpenetrasi mendalam untuk target masalah kulit spesifik', icon: 'fa-vial' },
  { id: 'moisturizer', name: 'Moisturizer', description: 'Pelembap pengunci hidrasi dan pelindung integritas sawar kulit', icon: 'fa-pump-soap' },
  { id: 'sunscreen', name: 'Sunscreen', description: 'Tabir surya pelindung spektrum luas UVA/UVB dan polusi', icon: 'fa-sun' },
  { id: 'masker', name: 'Masker', description: 'Perawatan mingguan intensif untuk detoksifikasi, hidrasi, dan peremajaan', icon: 'fa-spa' },
  { id: 'makeup', name: 'Makeup', description: 'Riasan higienis bertekstur ringan dan bersahabat untuk semua kondisi kulit', icon: 'fa-wand-magic-sparkles' },
  { id: 'bundle', name: 'Bundle', description: 'Paket produk hemat yang sudah dipasangkan dalam satu rangkaian perawatan atau riasan', icon: 'fa-gift' }
];

// Naikkan angka ini setiap data awal produk diubah, agar Local Storage lama diperbarui otomatis
const DATA_VERSION = 2;

const INITIAL_SKIN_TYPES = [
  { id: 'Berminyak', label: 'Berminyak', en: 'Oily Skin', desc: 'Produksi sebum berlebih, pori terlihat besar, kilap di area T-zone' },
  { id: 'Kering', label: 'Kering', en: 'Dry Skin', desc: 'Kurang kelembapan, terasa kaku, rentan bersisik atau garis halus' },
  { id: 'Kombinasi', label: 'Kombinasi', en: 'Combination', desc: 'Area T-zone berminyak sementara area pipi normal cenderung kering' },
  { id: 'Sensitif', label: 'Sensitif', en: 'Sensitive', desc: 'Mudah kemerahan, rentan perih atau iritasi saat terpapar bahan aktif' },
  { id: 'Berjerawat', label: 'Berjerawat', en: 'Acne-Prone', desc: 'Rentan timbul komedo, jerawat aktif, dan inflamasi pori-pori' }
];

const INITIAL_PRODUCTS = [
  {id: "CLN-001", name: "5X Ceramide Low pH Cleanser", category: "Cleanser", skinType: "Kombinasi", price: 99000, description: "Pembersih wajah berbusa lembut ber-pH rendah dengan 5X Ceramide, Tremella, dan Allantoin. Membersihkan sekaligus melembapkan serta menjaga skin barrier.", image: "assets/images/products/skintific-5x-ceramide-low-ph-cleanser.jpg", stock: 26, rating: 4.8, brand: "Skintific", featured: true},
  {id: "CLN-002", name: "5X Ceramide Barrier Micellar Water", category: "Cleanser", skinType: "Semua Jenis Kulit", price: 119000, description: "Micellar water dengan Ectoin, Panthenol, dan Betaine. Mengangkat makeup waterproof, melembapkan, dan menenangkan kulit. Cocok untuk semua jenis kulit. Kemasan 400 ml.", image: "assets/images/products/skintific-5x-ceramide-barrier-micellar-water.jpg", stock: 22, rating: 4.8, brand: "Skintific", featured: false},
  {id: "CLN-003", name: "Brightening Micellar Water Peach + Niacinamide", category: "Cleanser", skinType: "Semua Jenis Kulit", price: 59000, description: "Micellar water yang menghapus makeup waterproof dan kotoran dengan lembut, mencerahkan, dan menghidrasi tanpa rasa lengket. Untuk semua jenis kulit. Kemasan 300 ml.", image: "assets/images/products/glad2glow-brightening-micellar-water.jpg", stock: 35, rating: 4.6, brand: "Glad2Glow", featured: false},
  {id: "CLN-004", name: "Mugwort Salicylic Acid Acne Clear Micellar Water", category: "Cleanser", skinType: "Semua Jenis Kulit", price: 59000, description: "Micellar water dengan Mugwort dan Salicylic Acid untuk membersihkan makeup, mengatasi jerawat dan kemerahan, serta membersihkan pori dan mengontrol minyak. Kemasan 300 ml.", image: "assets/images/products/glad2glow-mugwort-acne-clear-micellar-water.jpg", stock: 30, rating: 4.6, brand: "Glad2Glow", featured: false},
  {id: "CLN-005", name: "Cherry Blossom Betaine Micellar Water", category: "Cleanser", skinType: "Semua Jenis Kulit", price: 59000, description: "Micellar water dengan Cherry Blossom dan Betaine yang membersihkan makeup waterproof, menghidrasi, melembapkan, dan menenangkan kulit kusam. Kemasan 300 ml.", image: "assets/images/products/glad2glow-cherry-blossom-micellar-water.jpg", stock: 31, rating: 4.7, brand: "Glad2Glow", featured: false},
  {id: "CLN-006", name: "Shirojyun Ultimate Whitening Face Wash", category: "Cleanser", skinType: "Berminyak", price: 49000, description: "Sabun cuci muka dengan Hyaluronic Acid yang membersihkan wajah sekaligus mencerahkan. Tanpa pewangi, tanpa pewarna, tanpa alkohol.", image: "assets/images/products/hada-labo-shirojyun-whitening-face-wash.jpg", stock: 40, rating: 4.7, brand: "Hada Labo", featured: false},
  {id: "CLN-007", name: "Gokujyun Ultimate Moisturizing Face Wash", category: "Cleanser", skinType: "Kering", price: 49000, description: "Sabun cuci muka dengan 3 jenis Hyaluronic Acid untuk membersihkan sambil menjaga kelembapan kulit. Tanpa pewangi, tanpa pewarna, tanpa alkohol.", image: "assets/images/products/hada-labo-gokujyun-moisturizing-face-wash.jpg", stock: 38, rating: 4.8, brand: "Hada Labo", featured: false},
  {id: "TNR-001", name: "Radiance Glow Serum Spray", category: "Toner", skinType: "Kering", price: 79000, description: "Serum dalam bentuk spray untuk memberi kilau sehat, menghidrasi, dan menenangkan kulit sepanjang hari. Kemasan 100 ml.", image: "assets/images/products/glad2glow-radiance-glow-serum-spray.jpg", stock: 21, rating: 4.6, brand: "Glad2Glow", featured: false},
  {id: "SRM-001", name: "PDRN Bright & Smooth Serum", category: "Serum", skinType: "Kombinasi", price: 149000, description: "Serum pencerah dengan PDRN (Sodium DNA) 5000 PPM, Brighteny, Illuminyl 3BB, dan Chronoglow untuk meningkatkan pancaran kulit dan meratakan warna kulit yang tidak merata. Kemasan 20 ml.", image: "assets/images/products/skintific-pdrn-bright-smooth-serum.jpg", stock: 24, rating: 4.8, brand: "Skintific", featured: true},
  {id: "SRM-002", name: "2% Salicylic Acid Anti-Acne Serum", category: "Serum", skinType: "Berjerawat", price: 139000, description: "Serum anti-jerawat dengan 2% Salicylic Acid, Niacinamide, Ceramides, dan Centella untuk menenangkan jerawat, benjolan, dan kemerahan. Kemasan 20 ml.", image: "assets/images/products/skintific-salicylic-acid-anti-acne-serum.jpg", stock: 18, rating: 4.7, brand: "Skintific", featured: true},
  {id: "SRM-003", name: "5X Ceramide Barrier Serum", category: "Serum", skinType: "Sensitif", price: 149000, description: "Serum dengan 5X Ceramide, Bisabolol, dan Panthenol untuk menenangkan kulit sensitif, memperkuat skin barrier, serta membantu mengontrol minyak dan jerawat. Kemasan 20 ml.", image: "assets/images/products/skintific-5x-ceramide-barrier-serum.jpg", stock: 20, rating: 4.9, brand: "Skintific", featured: true},
  {id: "SRM-004", name: "Centella Salicylic Acid Power Acne Serum", category: "Serum", skinType: "Berjerawat", price: 69000, description: "Serum perawatan jerawat dengan Centella dan Salicylic Acid untuk merawat jerawat dan kemerahan sekaligus menenangkan kulit kering. Kemasan 17 ml.", image: "assets/images/products/glad2glow-centella-salicylic-power-acne-serum.jpg", stock: 32, rating: 4.6, brand: "Glad2Glow", featured: false},
  {id: "SRM-005", name: "Perfect Vita C Bright Glow Serum", category: "Serum", skinType: "Kombinasi", price: 59000, description: "Serum pencerah dengan 3-O-Ethyl Ascorbic Acid (turunan Vitamin C) untuk membantu kulit tampak lebih cerah dan bercahaya. Kemasan 10 ml.", image: "assets/images/products/glad2glow-perfect-vita-c-bright-glow-serum.jpg", stock: 28, rating: 4.5, brand: "Glad2Glow", featured: false},
  {id: "SRM-006", name: "Pomegranate 10% Niacinamide Power Bright Serum", category: "Serum", skinType: "Berminyak", price: 69000, description: "Serum dengan 10% Niacinamide dan ekstrak delima untuk membantu memudarkan noda gelap dan meratakan warna kulit. Kemasan 17 ml.", image: "assets/images/products/glad2glow-pomegranate-niacinamide-power-bright-serum.jpg", stock: 9, rating: 4.7, brand: "Glad2Glow", featured: false},
  {id: "MOI-001", name: "5X Ceramide Barrier Moisture Gel", category: "Moisturizer", skinType: "Sensitif", price: 129000, description: "Pelembap gel dengan Hyaluronic Acid, Centella, dan Marine Collagen yang mengunci hidrasi dan menghaluskan tekstur kulit. Kemasan 30 g.", image: "assets/images/products/skintific-5x-ceramide-barrier-moisture-gel.jpg", stock: 19, rating: 4.9, brand: "Skintific", featured: true},
  {id: "SUN-001", name: "UV Shield Airy Smooth Sunscreen Serum SPF 50 PA++++", category: "Sunscreen", skinType: "Berminyak", price: 59000, description: "Tabir surya bertekstur ringan dengan Centella dan 3X antioksidan. Tidak lengket, menyamarkan pori, mengontrol kilap, dan melindungi dari sinar UV.", image: "assets/images/products/wardah-uv-shield-airy-smooth-sunscreen-serum.jpg", stock: 45, rating: 4.7, brand: "Wardah", featured: true},
  {id: "SUN-002", name: "UV Shield Acne Calming Sunscreen Moisturizer SPF 50 PA++++", category: "Sunscreen", skinType: "Berjerawat", price: 59000, description: "Tabir surya sekaligus pelembap dengan Salicylic Acid, Panthenol, dan Allantoin untuk kulit berjerawat. Hasil akhir matte dan menenangkan kulit berminyak.", image: "assets/images/products/wardah-uv-shield-acne-calming-sunscreen-moisturizer.jpg", stock: 12, rating: 4.6, brand: "Wardah", featured: false},
  {id: "MSK-001", name: "Niacinamide Bright Boost Clay Stick", category: "Masker", skinType: "Kombinasi", price: 99000, description: "Masker clay bentuk stik dengan Pink Sea Salt, Arbutin, dan Tranexamic Acid untuk mencerahkan, meratakan warna kulit, dan membersihkan kotoran. Berat 40 g.", image: "assets/images/products/skintific-niacinamide-bright-boost-clay-stick.jpg", stock: 25, rating: 4.7, brand: "Skintific", featured: false},
  {id: "MSK-002", name: "Mugwort Acne Clay Stick", category: "Masker", skinType: "Berjerawat", price: 99000, description: "Masker clay bentuk stik dengan Niacinamide, Salicylic Acid, dan Centella untuk meredakan jerawat dan kemerahan sambil membersihkan dan melembapkan. Berat 40 g.", image: "assets/images/products/skintific-mugwort-acne-clay-stick.jpg", stock: 23, rating: 4.8, brand: "Skintific", featured: true},
  {id: "MSK-003", name: "Alaska Volcano Pore Clay Stick", category: "Masker", skinType: "Berminyak", price: 99000, description: "Masker clay bentuk stik dengan Glycolic Acid, Probiotic Complex, dan Collagen untuk mengangkat sel kulit mati, membersihkan komedo, dan mengencangkan tampilan pori. Berat 40 g.", image: "assets/images/products/skintific-alaska-volcano-pore-clay-stick.jpg", stock: 7, rating: 4.8, brand: "Skintific", featured: false},
  {id: "MKP-001", name: "Tintdorable Blurry Tint - Burgundy", category: "Makeup", skinType: "Semua Jenis Kulit", price: 49000, description: "Lip tint dengan efek blur yang ringan di bibir, warna dapat ditumpuk dan tahan lama. Shade merah marun.", image: "assets/images/products/hanasui-blurry-tint-burgundy.jpg", stock: 30, rating: 4.7, brand: "Hanasui", featured: true},
  {id: "MKP-002", name: "Tintdorable Blurry Tint - Terracotta", category: "Makeup", skinType: "Semua Jenis Kulit", price: 49000, description: "Lip tint dengan efek blur yang ringan di bibir, warna dapat ditumpuk dan tahan lama. Shade terakota.", image: "assets/images/products/hanasui-blurry-tint-terracotta.jpg", stock: 28, rating: 4.6, brand: "Hanasui", featured: false},
  {id: "MKP-003", name: "Tintdorable Blurry Tint - Chocolate", category: "Makeup", skinType: "Semua Jenis Kulit", price: 49000, description: "Lip tint dengan efek blur yang ringan di bibir, warna dapat ditumpuk dan tahan lama. Shade cokelat.", image: "assets/images/products/hanasui-blurry-tint-chocolate.jpg", stock: 26, rating: 4.6, brand: "Hanasui", featured: false},
  {id: "MKP-004", name: "Tintdorable Blurry Tint - Coral Rose", category: "Makeup", skinType: "Semua Jenis Kulit", price: 49000, description: "Lip tint dengan efek blur yang ringan di bibir, warna dapat ditumpuk dan tahan lama. Shade koral mawar.", image: "assets/images/products/hanasui-blurry-tint-coral-rose.jpg", stock: 27, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "MKP-005", name: "Tintdorable Blurry Tint - Soft Rose", category: "Makeup", skinType: "Semua Jenis Kulit", price: 49000, description: "Lip tint dengan efek blur yang ringan di bibir, warna dapat ditumpuk dan tahan lama. Shade mawar lembut.", image: "assets/images/products/hanasui-blurry-tint-soft-rose.jpg", stock: 29, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "MKP-006", name: "Perfect Stay Serum Matte Cushion Foundation SPF 50 PA++++", category: "Makeup", skinType: "Berminyak", price: 159000, description: "Cushion foundation dengan hasil akhir matte dan perlindungan SPF 50 PA++++. Tahan lama dan cocok untuk kulit berminyak.", image: "assets/images/products/skintific-perfect-stay-serum-matte-cushion.jpg", stock: 18, rating: 4.8, brand: "Skintific", featured: true},
  {id: "MKP-007", name: "Cover Glow Perfect Cushion", category: "Makeup", skinType: "Kering", price: 179000, description: "Cushion dengan hasil akhir glowing yang menutupi dengan nyaman dan memberi tampilan kulit lembap, cocok untuk kulit kering.", image: "assets/images/products/skintific-cover-glow-perfect-cushion.jpg", stock: 15, rating: 4.7, brand: "Skintific", featured: false},
  {id: "MKP-008", name: "Perfect Stay Velvet Matte Cushion", category: "Makeup", skinType: "Berminyak", price: 169000, description: "Cushion dengan hasil akhir velvet matte untuk tampilan kulit halus, tahan lama, dan terkontrol dari minyak berlebih.", image: "assets/images/products/skintific-perfect-stay-velvet-matte-cushion.jpg", stock: 16, rating: 4.7, brand: "Skintific", featured: false},
  {id: "MKP-009", name: "Blurring Skin Tint", category: "Makeup", skinType: "Semua Jenis Kulit", price: 89000, description: "Skin tint dengan hasil akhir seperti kulit asli dan efek blur lembut pada pori. Memberi tampilan glowing alami.", image: "assets/images/products/glad2glow-blurring-skin-tint.jpg", stock: 22, rating: 4.6, brand: "Glad2Glow", featured: false},
  {id: "MKP-010", name: "Highlight & Contour Palette 01", category: "Makeup", skinType: "Semua Jenis Kulit", price: 169000, description: "Palet empat warna untuk highlight dan contour dalam satu kemasan, lengkap dengan kuas kecil. Shade 01.", image: "assets/images/products/judydoll-highlight-contour-palette-01.jpg", stock: 11, rating: 4.8, brand: "Judydoll", featured: false},
  {id: "MKP-011", name: "Next Level Bouncy Blush - Berry", category: "Makeup", skinType: "Semua Jenis Kulit", price: 59000, description: "Blush ringan dengan tekstur bouncy untuk rona segar sepanjang hari. Warna dapat ditumpuk. Shade berry.", image: "assets/images/products/hanasui-bouncy-blush-berry.jpg", stock: 24, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "MKP-012", name: "Next Level Bouncy Blush - Peach", category: "Makeup", skinType: "Semua Jenis Kulit", price: 59000, description: "Blush ringan dengan tekstur bouncy untuk rona segar sepanjang hari. Warna dapat ditumpuk. Shade peach.", image: "assets/images/products/hanasui-bouncy-blush-peach.jpg", stock: 25, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "MKP-013", name: "Next Level Bouncy Blush - Mauve", category: "Makeup", skinType: "Semua Jenis Kulit", price: 59000, description: "Blush ringan dengan tekstur bouncy untuk rona segar sepanjang hari. Warna dapat ditumpuk. Shade mauve.", image: "assets/images/products/hanasui-bouncy-blush-mauve.jpg", stock: 23, rating: 4.6, brand: "Hanasui", featured: false},
  {id: "MKP-014", name: "Tintdorable Lip Stain - Cocoa Nude", category: "Makeup", skinType: "Semua Jenis Kulit", price: 45000, description: "Lip tint jelly berbasis air yang memberi warna natural dan kilau sambil menjaga bibir tetap lembap. Shade nude cokelat.", image: "assets/images/products/hanasui-lip-stain-cocoa-nude.jpg", stock: 34, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "MKP-015", name: "Tintdorable Lip Stain - Fuchsia", category: "Makeup", skinType: "Semua Jenis Kulit", price: 45000, description: "Lip tint jelly berbasis air yang memberi warna natural dan kilau sambil menjaga bibir tetap lembap. Shade fuchsia.", image: "assets/images/products/hanasui-lip-stain-fuchsia.jpg", stock: 33, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "MKP-016", name: "Tintdorable Lip Stain - Soft Nude", category: "Makeup", skinType: "Semua Jenis Kulit", price: 45000, description: "Lip tint jelly berbasis air yang memberi warna natural dan kilau sambil menjaga bibir tetap lembap. Shade nude lembut.", image: "assets/images/products/hanasui-lip-stain-soft-nude.jpg", stock: 32, rating: 4.6, brand: "Hanasui", featured: false},
  {id: "MKP-017", name: "Get a Grip Makeup Setting Spray - Hydro", category: "Makeup", skinType: "Kering", price: 79000, description: "Setting spray dengan Cactus Extract. Mengunci makeup 24 jam, membantu menyeimbangkan minyak, dan mengaburkan pori. Untuk kulit kering dan sensitif.", image: "assets/images/products/dazzle-me-get-a-grip-hydro.jpg", stock: 20, rating: 4.6, brand: "Dazzle Me", featured: false},
  {id: "MKP-018", name: "All Day Glow Setting Spray", category: "Makeup", skinType: "Kering", price: 89000, description: "Setting spray dengan hasil glow tahan lama yang mengunci makeup dan menjaga tampilan kulit tetap segar. Kemasan 100 ml.", image: "assets/images/products/glad2glow-all-day-glow-setting-spray.jpg", stock: 17, rating: 4.7, brand: "Glad2Glow", featured: false},
  {id: "MKP-019", name: "Cover Fit Serum Cushion", category: "Makeup", skinType: "Semua Jenis Kulit", price: 139000, description: "Cushion dengan Niacinamide, Panthenol, dan ekstrak buah naga yang menutupi dengan nyaman sambil merawat kulit.", image: "assets/images/products/glowsophy-cover-fit-serum-cushion.jpg", stock: 14, rating: 4.7, brand: "Glowsophy", featured: false},
  {id: "MKP-020", name: "Get a Grip Makeup Setting Spray - Matte Fix", category: "Makeup", skinType: "Berminyak", price: 79000, description: "Setting spray yang mengunci makeup matte 24 jam, mengontrol minyak, dan tahan keringat, air, serta minyak (triple-proof).", image: "assets/images/products/dazzle-me-get-a-grip-matte-fix.jpg", stock: 19, rating: 4.6, brand: "Dazzle Me", featured: false},
  {id: "MKP-021", name: "Cover Glow Serum Cushion", category: "Makeup", skinType: "Kering", price: 139000, description: "Cushion dengan Niacinamide, Hyaluron, dan ekstrak semangka yang memberi hasil glowing dan menghidrasi kulit.", image: "assets/images/products/glowsophy-cover-glow-serum-cushion.jpg", stock: 13, rating: 4.7, brand: "Glowsophy", featured: false},
  {id: "MKP-022", name: "Get a Grip Makeup Setting Spray - Dewy Fix", category: "Makeup", skinType: "Kombinasi", price: 79000, description: "Setting spray yang mengunci makeup dewy 24 jam, menyeimbangkan air dan minyak, serta memberi hidrasi pada kulit.", image: "assets/images/products/dazzle-me-get-a-grip-dewy-fix.jpg", stock: 21, rating: 4.6, brand: "Dazzle Me", featured: false},
  {id: "MKP-023", name: "All Day Matte Setting Spray", category: "Makeup", skinType: "Berminyak", price: 89000, description: "Setting spray dengan hasil akhir matte lembut yang mengunci makeup hingga 12 jam dan tahan terhadap keringat, air, dan minyak. Kemasan 100 ml.", image: "assets/images/products/glad2glow-all-day-matte-setting-spray.jpg", stock: 8, rating: 4.7, brand: "Glad2Glow", featured: false},
  {id: "BDL-001", name: "Next Level Bouncy Blush Duo Set", category: "Bundle", skinType: "Semua Jenis Kulit", price: 105000, description: "Paket dua blush Hanasui Next Level Bouncy Blush yang ringan dan mudah dibaurkan untuk rona segar sepanjang hari.", image: "assets/images/products/hanasui-bouncy-blush-duo-set.jpg", stock: 15, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "BDL-002", name: "Tintdorable Lip Stain Duo Set", category: "Bundle", skinType: "Semua Jenis Kulit", price: 79000, description: "Paket dua lip stain jelly berbasis air dengan warna natural, kilau, dan efek melembapkan.", image: "assets/images/products/hanasui-lip-stain-duo-set.jpg", stock: 18, rating: 4.7, brand: "Hanasui", featured: false},
  {id: "BDL-003", name: "Tintdorable Blurry Tint Duo Set", category: "Bundle", skinType: "Semua Jenis Kulit", price: 89000, description: "Paket dua lip tint dengan efek blur yang ringan, warna dapat ditumpuk, dan tahan lama.", image: "assets/images/products/hanasui-blurry-tint-duo-set.jpg", stock: 16, rating: 4.6, brand: "Hanasui", featured: false},
  {id: "BDL-004", name: "Clay Care Set", category: "Bundle", skinType: "Berjerawat", price: 259000, description: "Paket tiga clay stick untuk membersihkan pori, menenangkan jerawat dan kemerahan, serta mencerahkan. Isi: Alaska Volcano Pore Clay Stick, Niacinamide Bright Boost Clay Stick, dan Mugwort Acne Clay Stick.", image: "assets/images/products/skintific-clay-care-set.jpg", stock: 12, rating: 4.8, brand: "Skintific", featured: true},
  {id: "BDL-005", name: "All Day Glow Set", category: "Bundle", skinType: "Semua Jenis Kulit", price: 299000, description: "Rangkaian lengkap untuk glow seharian. Isi: All Day Glow Setting Spray, Blurring Skin Tint, Radiance Glow Serum Spray, dan All Day Matte Setting Spray.", image: "assets/images/products/glad2glow-all-day-glow-set.jpg", stock: 10, rating: 4.7, brand: "Glad2Glow", featured: true},
  {id: "BDL-006", name: "Barrier Care Set", category: "Bundle", skinType: "Sensitif", price: 429000, description: "Rangkaian 5X Ceramide untuk membersihkan, menghidrasi, dan memperkuat skin barrier. Isi: Low pH Cleanser, Barrier Micellar Water, Barrier Moisture Gel, dan Barrier Serum.", image: "assets/images/products/skintific-barrier-care-set.jpg", stock: 9, rating: 4.9, brand: "Skintific", featured: true}
];

// Initial Demo Users
const INITIAL_USERS = [
  {
    id: 'USR-001',
    name: 'SKINORA Administrator',
    email: 'admin@skinora.com',
    password: 'admin123', // Demo authentication
    phone: '081234567890',
    role: 'admin',
    createdAt: '2026-11-01T08:00:00.000Z'
  },
  {
    id: 'USR-002',
    name: 'Siti Rahmawati',
    email: 'siti@example.com',
    password: 'password123',
    phone: '081987654321',
    role: 'customer',
    address: 'Jl. Senopati No. 45, Kebayoran Baru',
    city: 'Jakarta Selatan',
    postalCode: '12190',
    createdAt: '2026-11-05T10:30:00.000Z'
  }
];

// Initial Realistic Demo Orders
const INITIAL_ORDERS = [
  {
    orderId: 'SKN-202611-89F1',
    customerId: 'USR-002',
    customerName: 'Siti Rahmawati',
    customerEmail: 'siti@example.com',
    customerPhone: '081987654321',
    deliveryAddress: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan',
    city: 'Jakarta Selatan',
    postalCode: '12190',
    paymentMethod: 'Bank Transfer (BCA)',
    status: 'Completed',
    date: '2026-11-08T14:20:00.000Z',
    items: [
      {
        id: 'CLN-007',
        name: "Gokujyun Ultimate Moisturizing Face Wash",
        price: 49000,
        quantity: 1,
        image: 'assets/images/products/hada-labo-gokujyun-moisturizing-face-wash.jpg'
      },
      {
        id: 'SRM-003',
        name: "5X Ceramide Barrier Serum",
        price: 149000,
        quantity: 1,
        image: 'assets/images/products/skintific-5x-ceramide-barrier-serum.jpg'
      }
    ],
    subtotal: 198000,
    shipping: 20000,
    total: 218000
  },
  {
    orderId: 'SKN-202611-3A4C',
    customerId: 'USR-003',
    customerName: 'Budi Santoso',
    customerEmail: 'budi.santoso@example.com',
    customerPhone: '081299887766',
    deliveryAddress: 'Jl. Dago Asri No. 12, Coblong',
    city: 'Bandung',
    postalCode: '40135',
    paymentMethod: 'E-Wallet (GoPay)',
    status: 'Shipped',
    date: '2026-11-10T09:15:00.000Z',
    items: [
      {
        id: 'SUN-001',
        name: "UV Shield Airy Smooth Sunscreen Serum SPF 50 PA++++",
        price: 59000,
        quantity: 2,
        image: 'assets/images/products/wardah-uv-shield-airy-smooth-sunscreen-serum.jpg'
      }
    ],
    subtotal: 118000,
    shipping: 20000,
    total: 138000
  },
  {
    orderId: 'SKN-202611-7E2D',
    customerId: 'USR-004',
    customerName: 'Anisa Maharani',
    customerEmail: 'anisa.m@example.com',
    customerPhone: '085712345678',
    deliveryAddress: 'Jl. Malioboro No. 88, Gedongtengen',
    city: 'Yogyakarta',
    postalCode: '55271',
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Processing',
    date: '2026-11-11T16:45:00.000Z',
    items: [
      {
        id: 'SRM-004',
        name: "Centella Salicylic Acid Power Acne Serum",
        price: 69000,
        quantity: 1,
        image: 'assets/images/products/glad2glow-centella-salicylic-power-acne-serum.jpg'
      }
    ],
    subtotal: 69000,
    shipping: 20000,
    total: 89000
  }
];

// Export to window for vanilla browser script usage
if (typeof window !== 'undefined') {
  window.SKINORA_INITIAL = {
    categories: INITIAL_CATEGORIES,
    skinTypes: INITIAL_SKIN_TYPES,
    products: INITIAL_PRODUCTS,
    users: INITIAL_USERS,
    orders: INITIAL_ORDERS
  };
}

// Also export for ES module environments if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    INITIAL_CATEGORIES,
    INITIAL_SKIN_TYPES,
    INITIAL_PRODUCTS,
    INITIAL_USERS,
    INITIAL_ORDERS
  };
}
