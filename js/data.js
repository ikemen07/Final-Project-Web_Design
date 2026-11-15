/**
 * SKINORA Data Specification
 * 35 initial products across 7 categories and 5 skin types
 * Initial seed data for Local Storage architecture
 */

const INITIAL_CATEGORIES = [
  { id: 'cleanser', name: 'Cleanser', description: 'Pembersih wajah lembut mengangkat kotoran tanpa merusak skin barrier', icon: 'fa-soap' },
  { id: 'toner', name: 'Toner', description: 'Penyegar penyeimbang pH kulit dan persiapan penyerapan nutrisi', icon: 'fa-spray-can-sparkles' },
  { id: 'serum', name: 'Serum', description: 'Konsentrat aktif berpenetrasi mendalam untuk target masalah kulit spesifik', icon: 'fa-vial' },
  { id: 'moisturizer', name: 'Moisturizer', description: 'Pelembap pengunci hidrasi dan pelindung integritas sawar kulit', icon: 'fa-pump-soap' },
  { id: 'sunscreen', name: 'Sunscreen', description: 'Tabir surya pelindung spektrum luas UVA/UVB dan polusi', icon: 'fa-sun' },
  { id: 'masker', name: 'Masker', description: 'Perawatan mingguan intensif untuk detoksifikasi, hidrasi, dan peremajaan', icon: 'fa-spa' },
  { id: 'makeup', name: 'Makeup', description: 'Riasan higienis bertekstur ringan dan bersahabat untuk semua kondisi kulit', icon: 'fa-wand-magic-sparkles' }
];

const INITIAL_SKIN_TYPES = [
  { id: 'Berminyak', label: 'Berminyak', en: 'Oily Skin', desc: 'Produksi sebum berlebih, pori terlihat besar, kilap di area T-zone' },
  { id: 'Kering', label: 'Kering', en: 'Dry Skin', desc: 'Kurang kelembapan, terasa kaku, rentan bersisik atau garis halus' },
  { id: 'Kombinasi', label: 'Kombinasi', en: 'Combination', desc: 'Area T-zone berminyak sementara area pipi normal cenderung kering' },
  { id: 'Sensitif', label: 'Sensitif', en: 'Sensitive', desc: 'Mudah kemerahan, rentan perih atau iritasi saat terpapar bahan aktif' },
  { id: 'Berjerawat', label: 'Berjerawat', en: 'Acne-Prone', desc: 'Rentan timbul komedo, jerawat aktif, dan inflamasi pori-pori' }
];

const INITIAL_PRODUCTS = [
  // 1. CLEANSER (5 products)
  {
    id: 'CLN-001',
    name: 'Purifying Tea Tree Foaming Gel',
    category: 'Cleanser',
    skinType: 'Berminyak',
    price: 139000,
    description: 'Pembersih wajah bertekstur gel lembut dengan ekstrak Australian Tea Tree murni dan Salicylic Acid 0.5% untuk membersihkan sebum berlebih, mengontrol kilap tanpa rasa ketarik.',
    image: 'assets/images/products/cleanser-oily.svg',
    stock: 22,
    rating: 4.8,
    brand: 'SKINORA Botanicals',
    featured: true
  },
  {
    id: 'CLN-002',
    name: 'Hydrating Ceramide Milky Cleanser',
    category: 'Cleanser',
    skinType: 'Kering',
    price: 149000,
    description: 'Pembersih berformula susu kaya akan 5X Essential Ceramides dan Oat Milk untuk mengangkat debu sekaligus mengunci kelembapan alami sawar kulit kering.',
    image: 'assets/images/products/cleanser-dry.svg',
    stock: 18,
    rating: 4.9,
    brand: 'SKINORA Pure',
    featured: true
  },
  {
    id: 'CLN-003',
    name: 'Balancing Green Tea Gel Wash',
    category: 'Cleanser',
    skinType: 'Kombinasi',
    price: 135000,
    description: 'Formula gel kaya antioksidan teh hijau Jeju yang menyeimbangkan kadar minyak di area T-Zone sembari menjaga hidrasi area pipi tetap segar dan kenyal.',
    image: 'assets/images/products/cleanser-combination.svg',
    stock: 25,
    rating: 4.7,
    brand: 'SKINORA Lab',
    featured: false
  },
  {
    id: 'CLN-004',
    name: 'Ultra-Calming Oat Barrier Cleanser',
    category: 'Cleanser',
    skinType: 'Sensitif',
    price: 159000,
    description: 'Formula bebas busa, sulfat, alkohol, dan pewangi dengan Koloid Oatmeal serta Allantoin untuk menenangkan kulit reaktif, perih, dan kemerahan.',
    image: 'assets/images/products/cleanser-sensitive.svg',
    stock: 14,
    rating: 4.9,
    brand: 'SKINORA Derma',
    featured: false
  },
  {
    id: 'CLN-005',
    name: 'Acne Relief Salicylic Gentle Foam',
    category: 'Cleanser',
    skinType: 'Berjerawat',
    price: 145000,
    description: 'Busa pembersih pori mikro dengan BHA 1% dan Centella Asiatica untuk membersihkan sumbatan pori-pori dan meredakan iritasi jerawat aktif secara bertahap.',
    image: 'assets/images/products/cleanser-acne.svg',
    stock: 4,
    rating: 4.8,
    brand: 'SKINORA Derma',
    featured: false
  },

  // 2. TONER (5 products)
  {
    id: 'TNR-001',
    name: 'Pore Clarifying Witch Hazel Toner',
    category: 'Toner',
    skinType: 'Berminyak',
    price: 129000,
    description: 'Toner segar tanpa alkohol yang memadukan Witch Hazel organik dan Zinc PCA untuk meringkas pori-pori dan menekan sekresi minyak berlebih sepanjang hari.',
    image: 'assets/images/products/toner-oily.svg',
    stock: 20,
    rating: 4.7,
    brand: 'SKINORA Lab',
    featured: false
  },
  {
    id: 'TNR-002',
    name: 'Deep Moisture Hyaluronic Essence Toner',
    category: 'Toner',
    skinType: 'Kering',
    price: 165000,
    description: 'Essence toner kental berdaya serap tinggi dengan 8 ukuran molekul Hyaluronic Acid dan Panthenol untuk mengembalikan dehidrasi akut hingga lapisan terdalam.',
    image: 'assets/images/products/toner-dry.svg',
    stock: 19,
    rating: 4.9,
    brand: 'SKINORA Pure',
    featured: true
  },
  {
    id: 'TNR-003',
    name: 'Dual Action Balancing Hydrosol',
    category: 'Toner',
    skinType: 'Kombinasi',
    price: 145000,
    description: 'Kombinasi air mawar Damask dan ekstrak Niacinamide ringan yang menjaga keseimbangan pH optimal kulit kombinasi agar tidak kering maupun berminyak.',
    image: 'assets/images/products/toner-combination.svg',
    stock: 16,
    rating: 4.8,
    brand: 'SKINORA Botanicals',
    featured: false
  },
  {
    id: 'TNR-004',
    name: 'Centella Soothing Calming Tonic',
    category: 'Toner',
    skinType: 'Sensitif',
    price: 155000,
    description: 'Toner penenang berbasis 85% ekstrak Centella Asiatica murni dari dataran tinggi untuk meredakan kemerahan dan mempercepat pemulihan sawar kulit yang rapuh.',
    image: 'assets/images/products/toner-sensitive.svg',
    stock: 15,
    rating: 4.9,
    brand: 'SKINORA Derma',
    featured: false
  },
  {
    id: 'TNR-005',
    name: 'Clarifying BHA Pore Refining Toner',
    category: 'Toner',
    skinType: 'Berjerawat',
    price: 159000,
    description: 'Toner eksfoliasi harian lembut dengan Salicylic Acid 1% dan Heartleaf untuk membersihkan komedo hitam, komedo putih, serta mencegah timbulnya jerawat baru.',
    image: 'assets/images/products/toner-acne.svg',
    stock: 3,
    rating: 4.8,
    brand: 'SKINORA Derma',
    featured: true
  },

  // 3. SERUM (5 products)
  {
    id: 'SRM-001',
    name: 'Niacinamide 10% + Zinc Sebum Serum',
    category: 'Serum',
    skinType: 'Berminyak',
    price: 189000,
    description: 'Serum legendaris berkonsentrasi tinggi untuk menyamarkan tampilan pori-pori, memudarkan noda pasca jerawat, dan mengontrol produksi minyak harian.',
    image: 'assets/images/products/serum-oily.svg',
    stock: 24,
    rating: 4.9,
    brand: 'SKINORA Lab',
    featured: true
  },
  {
    id: 'SRM-002',
    name: 'Multi-Molecular Hyaluronic Hydrating Booster',
    category: 'Serum',
    skinType: 'Kering',
    price: 225000,
    description: 'Serum hidrasi super dengan Polyglutamic Acid dan Hyaluronate untuk mengunci hidrasi 48 jam, membuat kulit kenyal, bercahaya, dan tampak lebih muda.',
    image: 'assets/images/products/serum-dry.svg',
    stock: 18,
    rating: 4.9,
    brand: 'SKINORA Pure',
    featured: true
  },
  {
    id: 'SRM-003',
    name: 'Radiance Peptide & Vitamin C Fluid',
    category: 'Serum',
    skinType: 'Kombinasi',
    price: 215000,
    description: 'Serum antioksidan canggih yang mencerahkan warna kulit kusam yang tidak merata di area wajah kombinasi tanpa memicu komedo atau rasa lengket.',
    image: 'assets/images/products/serum-combination.svg',
    stock: 12,
    rating: 4.8,
    brand: 'SKINORA Glow',
    featured: false
  },
  {
    id: 'SRM-004',
    name: 'Barrier Recovery Ceramide Complex',
    category: 'Serum',
    skinType: 'Sensitif',
    price: 235000,
    description: 'Serum emulsi bio-identik dengan 3% Ceramide NP, AP, EOP serta Kolesterol untuk memulihkan skin barrier rusak akibat over-eksfoliasi atau cuaca ekstrem.',
    image: 'assets/images/products/serum-sensitive.svg',
    stock: 15,
    rating: 4.9,
    brand: 'SKINORA Derma',
    featured: false
  },
  {
    id: 'SRM-005',
    name: 'Intensive Acne BHA + Centella Ampoule',
    category: 'Serum',
    skinType: 'Berjerawat',
    price: 199000,
    description: 'Ampoule konsentrat target jerawat yang menggabungkan Encapsulated Salicylic Acid 2% dan Madecassoside murni untuk menenangkan jerawat batu dan bruntusan.',
    image: 'assets/images/products/serum-acne.svg',
    stock: 2,
    rating: 4.8,
    brand: 'SKINORA Derma',
    featured: true
  },

  // 4. MOISTURIZER (5 products)
  {
    id: 'MOI-001',
    name: 'Oil-Free Water Gel Mattifying Cream',
    category: 'Moisturizer',
    skinType: 'Berminyak',
    price: 169000,
    description: 'Pelembap berbahan dasar air yang cepat meresap seketika. Memberikan hasil akhir semi-matte tanpa residu licin atau rasa menyumbat pori-pori.',
    image: 'assets/images/products/moisturizer-oily.svg',
    stock: 21,
    rating: 4.8,
    brand: 'SKINORA Lab',
    featured: false
  },
  {
    id: 'MOI-002',
    name: 'Rich Shea & Ceramide Barrier Cream',
    category: 'Moisturizer',
    skinType: 'Kering',
    price: 195000,
    description: 'Krim mewah bertekstur beludru dengan Shea Butter organik, Squalane, dan Ceramide untuk melembapkan kulit kering yang sangat haus dan pecah-pecah.',
    image: 'assets/images/products/moisturizer-dry.svg',
    stock: 17,
    rating: 4.9,
    brand: 'SKINORA Pure',
    featured: true
  },
  {
    id: 'MOI-003',
    name: 'Dewy Hydrating Gel-Cream Infusion',
    category: 'Moisturizer',
    skinType: 'Kombinasi',
    price: 179000,
    description: 'Krim gel ringan yang memberikan kelembapan seimbang. Cepat menyerap di T-zone dan menghidrasi area pipi dengan kilau alami yang sehat.',
    image: 'assets/images/products/moisturizer-combination.svg',
    stock: 16,
    rating: 4.7,
    brand: 'SKINORA Glow',
    featured: false
  },
  {
    id: 'MOI-004',
    name: 'Ultra-Gentle Soothing Comfort Balm',
    category: 'Moisturizer',
    skinType: 'Sensitif',
    price: 189000,
    description: 'Pelembap hipoalergenik yang telah teruji klinis untuk meredakan rasa gatal, panas, dan kulit bersisik akibat dermatitis kontak maupun cuaca dingin.',
    image: 'assets/images/products/moisturizer-sensitive.svg',
    stock: 13,
    rating: 4.9,
    brand: 'SKINORA Derma',
    featured: false
  },
  {
    id: 'MOI-005',
    name: 'Blemish Calm Lightweight Lotion',
    category: 'Moisturizer',
    skinType: 'Berjerawat',
    price: 175000,
    description: 'Lotion pelembap non-komedogenik dengan Centella dan Zinc PCA yang menjaga hidrasi kulit berjerawat tanpa memicu proliferasi bakteri penyebab jerawat.',
    image: 'assets/images/products/moisturizer-acne.svg',
    stock: 11,
    rating: 4.7,
    brand: 'SKINORA Derma',
    featured: false
  },

  // 5. SUNSCREEN (5 products)
  {
    id: 'SUN-001',
    name: 'Matte Velvet Airy Sunscreen SPF 50+ PA++++',
    category: 'Sunscreen',
    skinType: 'Berminyak',
    price: 175000,
    description: 'Sunscreen bertekstur udara yang sangat ringan dengan teknologi sebum-absorbing powder untuk perlindungan maksimal UVA/UVB dan kontrol kilap hingga 12 jam.',
    image: 'assets/images/products/sunscreen-oily.svg',
    stock: 28,
    rating: 4.9,
    brand: 'SKINORA Glow',
    featured: true
  },
  {
    id: 'SUN-002',
    name: 'Hydra Glow Moisture Sun Milk SPF 50+',
    category: 'Sunscreen',
    skinType: 'Kering',
    price: 185000,
    description: 'Tabir surya bertekstur susu kaya asam hialuronat yang memberikan hasil akhir dewy berkilau alami tanpa white-cast dan tidak menggumpal di bawah riasan.',
    image: 'assets/images/products/sunscreen-dry.svg',
    stock: 20,
    rating: 4.8,
    brand: 'SKINORA Pure',
    featured: false
  },
  {
    id: 'SUN-003',
    name: 'Invisible Fluid Daily Shield SPF 50+',
    category: 'Sunscreen',
    skinType: 'Kombinasi',
    price: 169000,
    description: 'Sunscreen fluid transparan serbaguna dengan ekstrak Niacinamide yang meresap dalam hitungan detik tanpa rasa berat atau menyumbat pori-pori.',
    image: 'assets/images/products/sunscreen-combination.svg',
    stock: 22,
    rating: 4.7,
    brand: 'SKINORA Lab',
    featured: false
  },
  {
    id: 'SUN-004',
    name: '100% Mineral Physical Sunscreen SPF 50+',
    category: 'Sunscreen',
    skinType: 'Sensitif',
    price: 199000,
    description: 'Tabir surya fisik dengan Zinc Oxide dan Titanium Dioxide non-nano murni, aman untuk kulit hiper-reaktif, wanita hamil, serta anak-anak.',
    image: 'assets/images/products/sunscreen-sensitive.svg',
    stock: 14,
    rating: 4.9,
    brand: 'SKINORA Derma',
    featured: true
  },
  {
    id: 'SUN-005',
    name: 'Non-Comedogenic Acne Sun Shield SPF 45',
    category: 'Sunscreen',
    skinType: 'Berjerawat',
    price: 165000,
    description: 'Tabir surya harian yang diformulasikan khusus dengan Tea Tree dan Salicylic Acid mikro, terbukti tidak memicu komedo maupun jerawat baru.',
    image: 'assets/images/products/sunscreen-acne.svg',
    stock: 5,
    rating: 4.8,
    brand: 'SKINORA Derma',
    featured: false
  },

  // 6. MASKER (5 products)
  {
    id: 'MSK-001',
    name: 'Volcanic Clay Deep Pore Detox Mask',
    category: 'Masker',
    skinType: 'Berminyak',
    price: 125000,
    description: 'Masker lumpur vulkanik mineral tinggi yang menyerap minyak membandel, membersihkan kotoran mikro di pori-pori, dan memberikan sensasi sejuk segar.',
    image: 'assets/images/products/masker-oily.svg',
    stock: 19,
    rating: 4.7,
    brand: 'SKINORA Botanicals',
    featured: false
  },
  {
    id: 'MSK-002',
    name: 'Rose Collagen Overnight Sleeping Mask',
    category: 'Masker',
    skinType: 'Kering',
    price: 169000,
    description: 'Masker tidur kaya Kolagen terhidrolisis dan sari mawar Damaskus yang menutrisi kulit sepanjang malam, bangun tidur dengan kulit kenyal bercahaya.',
    image: 'assets/images/products/masker-dry.svg',
    stock: 15,
    rating: 4.9,
    brand: 'SKINORA Pure',
    featured: true
  },
  {
    id: 'MSK-003',
    name: 'Multi-Balancing Sheet Mask (5-Pack)',
    category: 'Masker',
    skinType: 'Kombinasi',
    price: 99000,
    description: 'Set 5 lembar masker tencel biodegradable dengan serum probiotik dan teh hijau untuk merestorasi keseimbangan mikrobioma kulit wajah.',
    image: 'assets/images/products/masker-combination.svg',
    stock: 30,
    rating: 4.8,
    brand: 'SKINORA Glow',
    featured: false
  },
  {
    id: 'MSK-004',
    name: 'Calendula Hydrogel Calming Mask',
    category: 'Masker',
    skinType: 'Sensitif',
    price: 139000,
    description: 'Masker gel dingin dengan kelopak bunga Calendula asli untuk meredakan kemerahan, rasa terbakar sinar matahari, dan kulit reaktif dalam 15 menit.',
    image: 'assets/images/products/masker-sensitive.svg',
    stock: 18,
    rating: 4.9,
    brand: 'SKINORA Derma',
    featured: false
  },
  {
    id: 'MSK-005',
    name: 'Tea Tree & Sulfur Clarifying Clay Mask',
    category: 'Masker',
    skinType: 'Berjerawat',
    price: 135000,
    description: 'Kombinasi Kaolin Clay, Sulfur organik, dan Tea Tree Oil untuk mengeringkan jerawat aktif dan meredakan peradangan pori tanpa membuat kulit terkelupas.',
    image: 'assets/images/products/masker-acne.svg',
    stock: 16,
    rating: 4.8,
    brand: 'SKINORA Botanicals',
    featured: false
  },

  // 7. MAKEUP (5 products)
  {
    id: 'MKP-001',
    name: 'Poreless Matte Velvet Cushion SPF 35',
    category: 'Makeup',
    skinType: 'Berminyak',
    price: 219000,
    description: 'Cushion berdaya tutup tinggi dengan teknologi soft-focus powder yang mengaburkan pori-pori dan tahan kilap minyak hingga 16 jam.',
    image: 'assets/images/products/makeup-oily.svg',
    stock: 20,
    rating: 4.8,
    brand: 'SKINORA Glow',
    featured: true
  },
  {
    id: 'MKP-002',
    name: 'Dewy Luminous Serum Tint Foundation',
    category: 'Makeup',
    skinType: 'Kering',
    price: 235000,
    description: 'Alas bedak hibrida perawatan kulit dengan kandungan 70% serum hidrasi dan Hyaluronic Acid untuk riasan halus bercahaya tanpa retak atau patchy.',
    image: 'assets/images/products/makeup-dry.svg',
    stock: 17,
    rating: 4.9,
    brand: 'SKINORA Pure',
    featured: false
  },
  {
    id: 'MKP-003',
    name: 'Natural Balance Satin Skin Tint',
    category: 'Makeup',
    skinType: 'Kombinasi',
    price: 209000,
    description: 'Skin tint bertekstur seringan air yang menyatu sempurna dengan warna kulit, memberikan coverage medium dengan satin finish yang natural dan tahan lama.',
    image: 'assets/images/products/makeup-combination.svg',
    stock: 23,
    rating: 4.7,
    brand: 'SKINORA Glow',
    featured: false
  },
  {
    id: 'MKP-004',
    name: 'Hypoallergenic Calming BB Cream',
    category: 'Makeup',
    skinType: 'Sensitif',
    price: 225000,
    description: 'BB Cream bebas pewangi dan bahan komedogenik dengan ekstrak Centella yang menyamarkan kemerahan sekaligus menutrisi kulit sensitif sepanjang hari.',
    image: 'assets/images/products/makeup-sensitive.svg',
    stock: 12,
    rating: 4.9,
    brand: 'SKINORA Derma',
    featured: false
  },
  {
    id: 'MKP-005',
    name: 'Acne-Safe Mineral Powder Foundation',
    category: 'Makeup',
    skinType: 'Berjerawat',
    price: 195000,
    description: 'Bedak fondasi mineral non-komedogenik dengan Zinc Oxide dan Tea Tree yang aman untuk jerawat aktif dan tidak menyumbat pori-pori.',
    image: 'assets/images/products/makeup-acne.svg',
    stock: 14,
    rating: 4.8,
    brand: 'SKINORA Lab',
    featured: false
  }
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
        id: 'CLN-002',
        name: 'Hydrating Ceramide Milky Cleanser',
        price: 149000,
        quantity: 1,
        image: 'assets/images/products/cleanser-dry.svg'
      },
      {
        id: 'SRM-002',
        name: 'Multi-Molecular Hyaluronic Hydrating Booster',
        price: 225000,
        quantity: 1,
        image: 'assets/images/products/serum-dry.svg'
      }
    ],
    subtotal: 374000,
    shipping: 0,
    total: 374000
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
        name: 'Matte Velvet Airy Sunscreen SPF 50+ PA++++',
        price: 175000,
        quantity: 2,
        image: 'assets/images/products/sunscreen-oily.svg'
      }
    ],
    subtotal: 350000,
    shipping: 0,
    total: 350000
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
        id: 'SRM-005',
        name: 'Intensive Acne BHA + Centella Ampoule',
        price: 199000,
        quantity: 1,
        image: 'assets/images/products/serum-acne.svg'
      }
    ],
    subtotal: 199000,
    shipping: 20000,
    total: 219000
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
