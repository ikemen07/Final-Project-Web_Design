/**
 * Catalog Page Controller for SKINORA
 * Combinable filters (Search, 7 Categories, 5 Skin Types, Price Range, Rating, Stock)
 * and 5 Sorting orders with dynamic rendering.
 */

const Catalog = {
  state: {
    search: '',
    category: 'all',
    skinType: 'all',
    minPrice: null,
    maxPrice: null,
    minRating: 0,
    stockStatus: 'all',
    sortBy: 'featured'
  },

  init() {
    this.parseQueryParams();
    this.bindFilterControls();
    this.render();
  },

  parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('search')) this.state.search = params.get('search');
    if (params.get('category')) this.state.category = params.get('category');
    if (params.get('skinType')) this.state.skinType = params.get('skinType');
    if (params.get('sortBy')) this.state.sortBy = params.get('sortBy');

    // Sync input controls if present
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput && this.state.search) searchInput.value = this.state.search;

    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect && this.state.sortBy) sortSelect.value = this.state.sortBy;
  },

  bindFilterControls() {
    // Search input
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.search = e.target.value;
        this.render();
      });
    }

    // Category Buttons or Radios
    const categoryBtns = document.querySelectorAll('[data-category-filter]');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category-filter');
        this.state.category = cat;
        this.updateActiveFilterUI('[data-category-filter]', btn);
        this.render();
      });
    });

    // Skin Type Buttons or Radios
    const skinTypeBtns = document.querySelectorAll('[data-skin-filter]');
    skinTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const skin = btn.getAttribute('data-skin-filter');
        this.state.skinType = skin;
        this.updateActiveFilterUI('[data-skin-filter]', btn);
        this.render();
      });
    });

    // Price Range Inputs
    const minPriceInput = document.getElementById('filter-min-price');
    const maxPriceInput = document.getElementById('filter-max-price');
    if (minPriceInput) {
      minPriceInput.addEventListener('input', (e) => {
        this.state.minPrice = e.target.value ? Number(e.target.value) : null;
        this.render();
      });
    }
    if (maxPriceInput) {
      maxPriceInput.addEventListener('input', (e) => {
        this.state.maxPrice = e.target.value ? Number(e.target.value) : null;
        this.render();
      });
    }

    // Rating Filter
    const ratingRadios = document.querySelectorAll('input[name="rating-filter"]');
    ratingRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        this.state.minRating = Number(radio.value);
        this.render();
      });
    });

    // Stock Status
    const stockSelect = document.getElementById('filter-stock-select');
    if (stockSelect) {
      stockSelect.addEventListener('change', (e) => {
        this.state.stockStatus = e.target.value;
        this.render();
      });
    }

    // Sorting Dropdown
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.render();
      });
    }

    // Clear Filters Button
    const clearBtn = document.getElementById('clear-filters-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearFilters());
    }
  },

  updateActiveFilterUI(selector, activeEl) {
    const all = document.querySelectorAll(selector);
    all.forEach(el => {
      el.classList.remove('bg-[#C96F91]', 'text-white', 'border-[#C96F91]');
      el.classList.add('bg-white', 'dark:bg-[#1E1A1E]', 'text-gray-700', 'dark:text-gray-300');
    });
    activeEl.classList.remove('bg-white', 'dark:bg-[#1E1A1E]', 'text-gray-700', 'dark:text-gray-300');
    activeEl.classList.add('bg-[#C96F91]', 'text-white', 'border-[#C96F91]');
  },

  clearFilters() {
    this.state = {
      search: '',
      category: 'all',
      skinType: 'all',
      minPrice: null,
      maxPrice: null,
      minRating: 0,
      stockStatus: 'all',
      sortBy: 'featured'
    };

    // Reset UI controls
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) searchInput.value = '';

    const minPriceInput = document.getElementById('filter-min-price');
    if (minPriceInput) minPriceInput.value = '';

    const maxPriceInput = document.getElementById('filter-max-price');
    if (maxPriceInput) maxPriceInput.value = '';

    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) sortSelect.value = 'featured';

    const stockSelect = document.getElementById('filter-stock-select');
    if (stockSelect) stockSelect.value = 'all';

    const ratingRadios = document.querySelectorAll('input[name="rating-filter"]');
    ratingRadios.forEach(r => r.checked = r.value === '0');

    // Reset button pills
    document.querySelectorAll('[data-category-filter]').forEach(b => {
      const isAll = b.getAttribute('data-category-filter') === 'all';
      if (isAll) {
        b.classList.add('bg-[#C96F91]', 'text-white');
        b.classList.remove('bg-white', 'dark:bg-[#1E1A1E]', 'text-gray-700', 'dark:text-gray-300');
      } else {
        b.classList.remove('bg-[#C96F91]', 'text-white');
        b.classList.add('bg-white', 'dark:bg-[#1E1A1E]', 'text-gray-700', 'dark:text-gray-300');
      }
    });

    document.querySelectorAll('[data-skin-filter]').forEach(b => {
      const isAll = b.getAttribute('data-skin-filter') === 'all';
      if (isAll) {
        b.classList.add('bg-[#C96F91]', 'text-white');
        b.classList.remove('bg-white', 'dark:bg-[#1E1A1E]', 'text-gray-700', 'dark:text-gray-300');
      } else {
        b.classList.remove('bg-[#C96F91]', 'text-white');
        b.classList.add('bg-white', 'dark:bg-[#1E1A1E]', 'text-gray-700', 'dark:text-gray-300');
      }
    });

    this.render();
  },

  render() {
    const grid = document.getElementById('catalog-product-grid');
    const countDisplay = document.getElementById('catalog-count-display');
    const emptyState = document.getElementById('catalog-empty-state');
    if (!grid) return;

    let products = Products.getAll();

    // 1. Search Query
    if (this.state.search && this.state.search.trim()) {
      const q = this.state.search.toLowerCase().trim();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // 2. Category
    if (this.state.category && this.state.category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === this.state.category.toLowerCase());
    }

    // 3. Skin Type
    if (this.state.skinType && this.state.skinType !== 'all') {
      products = products.filter(p => Products.matchesSkin(p, this.state.skinType));
    }

    // 4. Price range
    if (this.state.minPrice !== null && !isNaN(this.state.minPrice)) {
      products = products.filter(p => p.price >= this.state.minPrice);
    }
    if (this.state.maxPrice !== null && !isNaN(this.state.maxPrice) && this.state.maxPrice > 0) {
      products = products.filter(p => p.price <= this.state.maxPrice);
    }

    // 5. Rating
    if (this.state.minRating > 0) {
      products = products.filter(p => p.rating >= this.state.minRating);
    }

    // 6. Stock status
    if (this.state.stockStatus === 'in_stock') {
      products = products.filter(p => p.stock > 0);
    } else if (this.state.stockStatus === 'low_stock') {
      products = products.filter(p => p.stock > 0 && p.stock <= 5);
    }

    // 7. Sorting
    switch (this.state.sortBy) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // reverse ID order
        products.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    // Update count display
    if (countDisplay) {
      countDisplay.textContent = `Menampilkan ${products.length} produk`;
    }

    // Render results or empty state
    if (products.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      grid.innerHTML = products.map(p => renderProductCardHTML(p)).join('');
      // Sync wishlist hearts
      Wishlist.syncHeartButtons();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Catalog.init();
});

if (typeof window !== 'undefined') {
  window.Catalog = Catalog;
}
