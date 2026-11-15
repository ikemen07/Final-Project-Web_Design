/**
 * Master Application Controller for SKINORA
 * Handles global bootstrapping, mobile navigation drawer, and search modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize local storage seed data
  if (window.Storage) {
    Storage.init();
  }

  // 2. Initialize mobile navigation hamburger menu
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  const mobileDrawer = document.getElementById('mobile-menu');

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('menu-closed');
      mobileDrawer.classList.add('menu-open');
    });
  }

  if (mobileCloseBtn && mobileDrawer) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('menu-open');
      mobileDrawer.classList.add('menu-closed');
    });
  }

  // 3. Global Quick Search Modal
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  const searchModal = document.getElementById('global-search-modal');
  const searchClose = document.getElementById('global-search-close');
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('global-search-results');

  if (searchTriggers.length && searchModal) {
    searchTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
        if (searchInput) searchInput.focus();
      });
    });

    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchModal.classList.add('hidden');
      });
    }

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
          searchResults.innerHTML = '<p class="text-xs text-gray-400 p-4 text-center">Ketik minimal 2 karakter untuk mencari produk...</p>';
          return;
        }

        const all = Products.getAll();
        const matches = all.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.skinType.toLowerCase().includes(query)
        ).slice(0, 6);

        if (matches.length === 0) {
          searchResults.innerHTML = '<p class="text-xs text-gray-500 p-4 text-center">Tidak ditemukan produk yang cocok.</p>';
          return;
        }

        searchResults.innerHTML = matches.map(p => `
          <a href="product.html?id=${p.id}" class="flex items-center gap-3 p-3 hover:bg-pink-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <img src="${p.image}" alt="${p.name}" class="w-12 h-12 object-contain bg-pink-50/50 rounded-lg shrink-0" onerror="this.src='assets/images/banners/hero-banner.jpg'" />
            <div class="flex-1 min-w-0">
              <span class="text-[10px] uppercase font-bold text-[#C96F91] tracking-wider">${p.brand}</span>
              <p class="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">${p.name}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-xs font-bold text-gray-900 dark:text-gray-100 tabular-nums">Rp ${p.price.toLocaleString('id-ID')}</span>
                <span class="text-[10px] text-gray-400">·</span>
                <span class="text-[10px] text-gray-500">${p.skinType}</span>
              </div>
            </div>
          </a>
        `).join('');
      });
    }
  }

  // 4. Update Footer Copyright Year
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(s => s.textContent = currentYear);
});

/**
 * Universal reusable Product Card HTML generator
 */
function renderProductCardHTML(product) {
  const isWishlisted = Wishlist ? Wishlist.has(product.id) : false;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return `
    <article class="skinora-card group">
      <!-- Media Box -->
      <div class="card-media-wrapper">
        <a href="product.html?id=${product.id}" class="block w-full h-full" aria-label="Lihat detail ${product.name}">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="card-media-img" 
            loading="lazy"
            onerror="this.src='assets/images/banners/hero-banner.jpg'"
          />
        </a>

        <!-- Wishlist floating heart button -->
        <button 
          type="button"
          data-wishlist-id="${product.id}"
          onclick="Wishlist.toggle(Products.getById('${product.id}'))"
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-[#1E1A1E]/90 backdrop-blur-sm shadow-sm flex items-center justify-center transition-transform hover:scale-110 z-10"
          aria-label="${isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}"
        >
          <i class="${isWishlisted ? 'fa-solid text-[#C96F91]' : 'fa-regular text-gray-400'} fa-heart text-sm"></i>
        </button>

        <!-- Stock Tag Badge -->
        ${isOutOfStock ? `
          <span class="absolute top-3 left-3 px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            Habis
          </span>
        ` : isLowStock ? `
          <span class="absolute top-3 left-3 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            Sisa ${product.stock}
          </span>
        ` : product.featured ? `
          <span class="absolute top-3 left-3 px-2 py-0.5 bg-[#C96F91] text-white text-[10px] font-semibold rounded-full uppercase tracking-wider">
            Featured
          </span>
        ` : ''}
      </div>

      <!-- Content Box -->
      <div class="p-4 flex flex-col flex-1">
        <!-- Brand & Category -->
        <div class="flex items-center justify-between text-[11px] text-[#8A7D84] dark:text-[#B5A4AD] mb-1">
          <span class="uppercase tracking-wider font-semibold truncate max-w-[65%]">${product.brand}</span>
          <span class="skin-tag skin-tag-${Products._mapSkinSlug(product.skinType)}">${product.skinType}</span>
        </div>

        <!-- Product Name -->
        <h3 class="font-sans font-semibold text-sm text-[#292329] dark:text-[#F7EDF2] line-clamp-2 mb-2 group-hover:text-[#C96F91] transition-colors">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>

        <!-- Rating & Reviews -->
        <div class="flex items-center gap-1.5 text-xs text-amber-500 mb-3">
          <i class="fa-solid fa-star text-[11px]"></i>
          <span class="font-bold text-[#292329] dark:text-[#F7EDF2] text-xs">${product.rating.toFixed(1)}</span>
          <span class="text-gray-400 text-[10px]">(50+ ulasan)</span>
        </div>

        <!-- Price & Action (Pushed to bottom) -->
        <div class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span class="text-sm font-bold text-[#292329] dark:text-[#F7EDF2] tabular-nums">
            Rp ${product.price.toLocaleString('id-ID')}
          </span>
          <button 
            type="button"
            onclick="Cart.buyNow(Products.getById('${product.id}'), 1)"
            ${isOutOfStock ? 'disabled' : ''}
            class="px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${isOutOfStock ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-[#FCE8EF] dark:bg-[#382631] text-[#C96F91] hover:bg-[#C96F91] hover:text-white'} transition-colors"
            aria-label="Pesan ${product.name}"
          >
            <i class="fa-solid fa-bag-shopping text-[11px]"></i><span>Pesan</span>
          </button>
        </div>
      </div>
    </article>
  `;
}
