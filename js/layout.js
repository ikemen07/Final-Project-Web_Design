/**
 * Shared Layout for SKINORA
 * Menyisipkan strip promo, navigasi utama, drawer mobile, dan modal pencarian
 * ke elemen <div id="site-header"></div> di setiap halaman publik.
 *
 * Navigasi tetap (4 menu, tanpa dropdown):
 *   Home | Produk | About | Pesanan Saya
 */

(function () {
  const NAV_ITEMS = [
    { label: 'Home', href: 'index.html', pages: ['index.html', ''] },
    { label: 'Produk', href: 'catalog.html', pages: ['catalog.html', 'product.html'] },
    { label: 'About', href: 'about.html', pages: ['about.html'] },
    { label: 'Pesanan Saya', href: 'pesanan.html', pages: ['pesanan.html'] }
  ];

  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isActive = (item) => item.pages.includes(currentPage);

  function desktopItem(item) {
    const active = isActive(item);
    return `<a href="${item.href}" class="whitespace-nowrap transition-colors hover:text-[#C96F91] ${active ? 'text-[#C96F91]' : ''}" ${active ? 'aria-current="page"' : ''}>${item.label}</a>`;
  }

  function mobileItem(item) {
    const color = isActive(item) ? 'text-[#C96F91]' : 'text-gray-700';
    return `<a href="${item.href}" class="${color} hover:text-[#C96F91] py-2 block">${item.label}</a>`;
  }

  const headerHTML = `
  <div class="bg-[#C96F91] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
    <span><strong>GRATIS ONGKIR</strong> untuk semua pesanan minimal Rp 200.000 ke seluruh Indonesia</span>
  </div>

  <header class="sticky top-0 z-40 bg-white/90 dark:bg-[#1E1A1E]/90 backdrop-blur-md border-b border-pink-100 dark:border-pink-900/30 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-8">
      <a href="index.html" class="flex items-center gap-2.5 shrink-0 group">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C96F91] to-[#E8A0B8] flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
          <i class="fa-solid fa-spa text-lg"></i>
        </div>
        <div class="flex flex-col">
          <span class="font-serif text-2xl font-bold tracking-widest text-[#292329] dark:text-[#F7EDF2]">SKINORA</span>
          <span class="text-[9px] uppercase tracking-[0.25em] text-[#C96F91] font-semibold">Haute Dermatology</span>
        </div>
      </a>

      <nav class="hidden md:flex items-center gap-9 text-sm font-semibold text-gray-700 dark:text-gray-300" aria-label="Navigasi utama">
        ${NAV_ITEMS.map(desktopItem).join('')}
      </nav>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <button type="button" class="search-trigger-btn w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors" aria-label="Buka Pencarian">
          <i class="fa-solid fa-magnifying-glass text-sm"></i>
        </button>
        <button type="button" class="wishlist-open-btn relative w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-50 transition-colors" aria-label="Buka produk favorit">
          <i class="fa-solid fa-bag-shopping text-sm"></i>
          <span class="wishlist-badge absolute -top-1 -right-1 w-4 h-4 bg-[#C96F91] text-white text-[10px] font-bold rounded-full hidden items-center justify-center">0</span>
        </button>
        <div id="nav-user-container"></div>
        <button type="button" id="mobile-menu-toggle" class="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors" aria-label="Buka Menu Mobile">
          <i class="fa-solid fa-bars text-sm"></i>
        </button>
      </div>
    </div>
  </header>

  <div id="mobile-menu" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm menu-closed md:hidden flex justify-end">
    <div class="w-72 bg-white dark:bg-[#1E1A1E] h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
      <div>
        <div class="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
          <span class="font-serif text-xl font-bold tracking-widest text-[#292329] dark:text-[#F7EDF2]">SKINORA</span>
          <button id="mobile-menu-close" class="p-2 text-gray-400 hover:text-gray-600" aria-label="Tutup menu">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        <nav class="flex flex-col gap-2 mt-6 text-sm font-semibold" aria-label="Navigasi mobile">
          ${NAV_ITEMS.map(mobileItem).join('')}
        </nav>
      </div>
      <div class="pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 text-center">
        © <span class="current-year">2026</span> SKINORA. All rights reserved.
      </div>
    </div>
  </div>`;

  const searchModalHTML = `
  <div id="global-search-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-start justify-center pt-20 px-4">
    <div class="w-full max-w-xl bg-white dark:bg-[#1E1A1E] rounded-3xl shadow-2xl border border-pink-100 dark:border-gray-800 overflow-hidden">
      <div class="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <i class="fa-solid fa-magnifying-glass text-[#C96F91]"></i>
        <input type="text" id="global-search-input" placeholder="Cari produk berdasarkan nama, brand, atau kategori..." class="flex-1 bg-transparent border-none text-sm focus:outline-none dark:text-white" />
        <button id="global-search-close" class="text-gray-400 hover:text-gray-600 p-1" aria-label="Tutup pencarian">
          <i class="fa-solid fa-xmark text-base"></i>
        </button>
      </div>
      <div id="global-search-results" class="max-h-80 overflow-y-auto p-2">
        <p class="text-xs text-gray-400 p-4 text-center">Ketik minimal 2 karakter untuk mencari produk...</p>
      </div>
    </div>
  </div>`;

  const wishlistDrawerHTML = `
  <div id="wishlist-drawer" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true" aria-label="Produk favorit">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" data-wishlist-close></div>
    <aside class="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
      <div class="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
        <h2 class="font-serif text-xl font-bold">Produk Favorit</h2>
        <button type="button" data-wishlist-close class="p-2 text-gray-400 hover:text-gray-600" aria-label="Tutup"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>
      <div id="wishlist-drawer-body" class="flex-1 overflow-y-auto p-4 space-y-3"></div>
    </aside>
  </div>`;

  const mount = document.getElementById('site-header');
  if (mount) {
    mount.insertAdjacentHTML('beforebegin', headerHTML);
    mount.remove();
  }
  document.body.insertAdjacentHTML('beforeend', wishlistDrawerHTML);
  if (!document.getElementById('global-search-modal')) {
    document.body.insertAdjacentHTML('beforeend', searchModalHTML);
  }
})();
