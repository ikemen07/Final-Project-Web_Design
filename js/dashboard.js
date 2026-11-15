/**
 * Admin Dashboard Controller for SKINORA
 * Complete product CRUD, category CRUD, order management, and KPI statistics.
 */

const Dashboard = {
  currentTab: 'overview',
  searchQuery: '',
  categoryFilter: 'all',

  init() {
    // 1. Check Admin Auth Guard
    if (!Auth.guardAdmin()) return;

    // 2. Render KPI Stats
    this.renderKPIs();

    // 3. Initialize Chart.js
    if (window.DashboardCharts) {
      DashboardCharts.init();
    }

    // 4. Render Tables
    this.renderProductsTable();
    this.renderCategoriesTable();
    this.renderOrdersTable();

    // 5. Bind Navigation & Forms
    this.bindEvents();
  },

  renderKPIs() {
    const stats = Orders.getDashboardStats();

    const totalProdEl = document.getElementById('stat-total-products');
    const totalCatEl = document.getElementById('stat-total-categories');
    const totalOrdersEl = document.getElementById('stat-total-orders');
    const totalRevEl = document.getElementById('stat-total-revenue');
    const totalCustEl = document.getElementById('stat-total-customers');
    const lowStockEl = document.getElementById('stat-low-stock');

    if (totalProdEl) totalProdEl.textContent = stats.totalProducts;
    if (totalCatEl) totalCatEl.textContent = stats.totalCategories;
    if (totalOrdersEl) totalOrdersEl.textContent = stats.totalOrders;
    if (totalRevEl) totalRevEl.textContent = `Rp ${stats.totalRevenue.toLocaleString('id-ID')}`;
    if (totalCustEl) totalCustEl.textContent = stats.totalCustomers;
    if (lowStockEl) lowStockEl.textContent = stats.lowStockCount;
  },

  /**
   * PRODUCTS CRUD: READ Table
   */
  renderProductsTable() {
    const tbody = document.getElementById('dashboard-products-tbody');
    if (!tbody) return;

    let products = Products.getAll();

    // Search filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }

    // Category filter
    if (this.categoryFilter !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === this.categoryFilter.toLowerCase());
    }

    tbody.innerHTML = products.map(p => {
      const isLowStock = p.stock > 0 && p.stock <= 5;
      const isOutOfStock = p.stock <= 0;

      return `
        <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-pink-50/30 dark:hover:bg-gray-800/40 transition-colors">
          <td class="py-3 px-3 text-xs font-mono font-bold text-gray-500">${p.id}</td>
          <td class="py-3 px-3">
            <div class="flex items-center gap-3">
              <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain rounded-lg bg-pink-50/50 p-1 shrink-0 border border-pink-100/40" onerror="this.src='assets/images/banners/hero-banner.jpg'" />
              <div class="min-w-0">
                <span class="text-[9px] uppercase font-bold text-[#C96F91] tracking-wider">${p.brand}</span>
                <p class="font-semibold text-xs text-gray-800 dark:text-gray-200 truncate max-w-xs">${p.name}</p>
              </div>
            </div>
          </td>
          <td class="py-3 px-3 text-xs text-gray-600 dark:text-gray-400">${p.category}</td>
          <td class="py-3 px-3">
            <span class="skin-tag skin-tag-${Products._mapSkinSlug(p.skinType)} text-[10px]">${p.skinType}</span>
          </td>
          <td class="py-3 px-3 text-xs font-bold text-gray-900 dark:text-gray-100 tabular-nums">
            Rp ${p.price.toLocaleString('id-ID')}
          </td>
          <td class="py-3 px-3">
            ${isOutOfStock ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">Habis (0)</span>
            ` : isLowStock ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Sisa ${p.stock}</span>
            ` : `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">${p.stock} unit</span>
            `}
          </td>
          <td class="py-3 px-3 text-center">
            ${p.featured ? '<i class="fa-solid fa-star text-amber-400 text-xs"></i>' : '<span class="text-gray-300">-</span>'}
          </td>
          <td class="py-3 px-3 text-right">
            <div class="inline-flex items-center gap-1">
              <button onclick="Dashboard.openEditProductModal('${p.id}')" class="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors" title="Edit Produk">
                <i class="fa-regular fa-pen-to-square text-xs"></i>
              </button>
              <button onclick="Dashboard.deleteProduct('${p.id}')" class="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors" title="Hapus Produk">
                <i class="fa-regular fa-trash-can text-xs"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  /**
   * PRODUCTS CRUD: CREATE / UPDATE Modal Form Handling
   */
  openCreateProductModal() {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('product-modal-title');

    if (!modal || !form) return;

    form.reset();
    form['product-id'].value = '';
    title.textContent = 'Tambah Produk Baru';

    // Populate category dropdown
    this.populateCategorySelect('product-category');

    modal.classList.remove('hidden');
  },

  openEditProductModal(id) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('product-modal-title');
    const p = Products.getById(id);

    if (!modal || !form || !p) return;

    this.populateCategorySelect('product-category');

    form['product-id'].value = p.id;
    form['name'].value = p.name;
    form['brand'].value = p.brand;
    form['category'].value = p.category;
    form['skinType'].value = p.skinType;
    form['price'].value = p.price;
    form['stock'].value = p.stock;
    form['image'].value = p.image;
    form['rating'].value = p.rating;
    form['featured'].checked = p.featured;
    form['description'].value = p.description;

    title.textContent = `Edit Produk: ${p.name}`;
    modal.classList.remove('hidden');
  },

  closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.add('hidden');
  },

  handleProductFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const existingId = form['product-id'].value;

    const formData = {
      name: form['name'].value,
      brand: form['brand'].value,
      category: form['category'].value,
      skinType: form['skinType'].value,
      price: form['price'].value,
      stock: form['stock'].value,
      image: form['image'].value,
      rating: form['rating'].value,
      featured: form['featured'].checked,
      description: form['description'].value
    };

    // Client-side Validation
    const validation = Validation.validateProduct(formData);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      Notifications.toast(firstError, 'error');
      return;
    }

    if (existingId) {
      // UPDATE
      const res = Products.update(existingId, formData);
      if (res.success) {
        Notifications.toast(res.message, 'success');
        this.closeProductModal();
        this.renderProductsTable();
        this.renderKPIs();
      } else {
        Notifications.toast(res.message, 'error');
      }
    } else {
      // CREATE
      const res = Products.create(formData);
      if (res.success) {
        Notifications.toast(res.message, 'success');
        this.closeProductModal();
        this.renderProductsTable();
        this.renderKPIs();
      } else {
        Notifications.toast(res.message, 'error');
      }
    }
  },

  async deleteProduct(id) {
    const p = Products.getById(id);
    if (!p) return;

    const confirmed = await Notifications.confirm(
      'Hapus Produk?',
      `Apakah Anda yakin ingin menghapus "${p.name}"? Tindakan ini tidak dapat dibatalkan.`
    );

    if (confirmed) {
      const res = Products.delete(id);
      if (res.success) {
        Notifications.toast(res.message, 'success');
        this.renderProductsTable();
        this.renderKPIs();
      } else {
        Notifications.toast(res.message, 'error');
      }
    }
  },

  /**
   * CATEGORIES CRUD
   */
  renderCategoriesTable() {
    const tbody = document.getElementById('dashboard-categories-tbody');
    if (!tbody) return;

    const categories = Products.getCategories();
    const products = Products.getAll();

    tbody.innerHTML = categories.map(c => {
      const count = products.filter(p => p.category.toLowerCase() === c.name.toLowerCase()).length;
      return `
        <tr class="border-b border-gray-100 dark:border-gray-800">
          <td class="py-3 px-3 text-xs font-mono font-bold text-gray-500">${c.id}</td>
          <td class="py-3 px-3 font-semibold text-xs text-gray-800 dark:text-gray-200">
            <i class="fa-solid ${c.icon} text-[#C96F91] mr-2"></i> ${c.name}
          </td>
          <td class="py-3 px-3 text-xs text-gray-500 max-w-sm truncate">${c.description || '-'}</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">
              ${count} Produk
            </span>
          </td>
          <td class="py-3 px-3 text-right">
            <div class="inline-flex items-center gap-1">
              <button onclick="Dashboard.deleteCategory('${c.id}')" class="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors" title="Hapus Kategori">
                <i class="fa-regular fa-trash-can text-xs"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  async deleteCategory(id) {
    const confirmed = await Notifications.confirm('Hapus Kategori?', 'Hapus kategori ini secara permanen?');
    if (confirmed) {
      const res = Products.deleteCategory(id);
      if (res.success) {
        Notifications.toast(res.message, 'success');
        this.renderCategoriesTable();
        this.renderKPIs();
      } else {
        Notifications.toast(res.message, 'error');
      }
    }
  },

  openCreateCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (modal) modal.classList.add('hidden');
  },

  handleCategoryFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form['cat-name'].value.trim();
    const desc = form['cat-desc'].value.trim();

    if (!name) {
      Notifications.toast('Nama kategori wajib diisi.', 'error');
      return;
    }

    const res = Products.createCategory({ name, description: desc });
    if (res.success) {
      Notifications.toast(res.message, 'success');
      this.closeCategoryModal();
      this.renderCategoriesTable();
      this.renderKPIs();
    } else {
      Notifications.toast(res.message, 'error');
    }
  },

  /**
   * ORDERS MANAGEMENT Table
   */
  renderOrdersTable() {
    const tbody = document.getElementById('dashboard-orders-tbody');
    if (!tbody) return;

    const orders = Orders.getAll();

    tbody.innerHTML = orders.map(o => {
      const statusClasses = {
        'Pending': 'status-pending',
        'Processing': 'status-processing',
        'Shipped': 'status-shipped',
        'Completed': 'status-completed',
        'Cancelled': 'status-cancelled'
      };

      const dateStr = new Date(o.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      return `
        <tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-pink-50/20 dark:hover:bg-gray-800/30 transition-colors">
          <td class="py-3 px-3 text-xs font-mono font-bold text-[#C96F91]">${o.orderId}</td>
          <td class="py-3 px-3">
            <p class="font-semibold text-xs text-gray-800 dark:text-gray-200">${o.customerName}</p>
            <p class="text-[10px] text-gray-400">${o.customerEmail}</p>
          </td>
          <td class="py-3 px-3 text-xs text-gray-500">${dateStr}</td>
          <td class="py-3 px-3 text-xs text-gray-600 dark:text-gray-400 max-w-xs truncate">
            ${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
          </td>
          <td class="py-3 px-3 text-xs font-bold text-gray-900 dark:text-gray-100 tabular-nums">
            Rp ${o.total.toLocaleString('id-ID')}
          </td>
          <td class="py-3 px-3 text-[11px] text-gray-500">${o.paymentMethod}</td>
          <td class="py-3 px-3">
            <!-- Dynamic Status Select Dropdown -->
            <select 
              onchange="Dashboard.changeOrderStatus('${o.orderId}', this.value)"
              class="text-xs font-semibold py-1 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1A1E] focus:outline-none focus:border-[#C96F91] ${statusClasses[o.status] || ''}"
            >
              <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');
  },

  changeOrderStatus(orderId, newStatus) {
    Orders.updateStatus(orderId, newStatus);
    this.renderKPIs();
    this.renderOrdersTable();
  },

  populateCategorySelect(elementId) {
    const select = document.getElementById(elementId);
    if (!select) return;

    const categories = Products.getCategories();
    select.innerHTML = categories.map(c => `
      <option value="${c.name}">${c.name}</option>
    `).join('');
  },

  bindEvents() {
    // Search input in product table
    const searchInput = document.getElementById('dash-product-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderProductsTable();
      });
    }

    // Category filter in product table
    const catSelect = document.getElementById('dash-product-cat-filter');
    if (catSelect) {
      const categories = Products.getCategories();
      catSelect.innerHTML = '<option value="all">Semua Kategori</option>' + categories.map(c => `
        <option value="${c.name}">${c.name}</option>
      `).join('');

      catSelect.addEventListener('change', (e) => {
        this.categoryFilter = e.target.value;
        this.renderProductsTable();
      });
    }

    // Product Modal form
    const productForm = document.getElementById('product-form');
    if (productForm) {
      productForm.addEventListener('submit', (e) => this.handleProductFormSubmit(e));
    }

    // Category Modal form
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
      categoryForm.addEventListener('submit', (e) => this.handleCategoryFormSubmit(e));
    }

    // CSV Export buttons
    const exportProdBtn = document.getElementById('export-products-csv-btn');
    if (exportProdBtn) {
      exportProdBtn.addEventListener('click', () => CSVExport.exportProducts());
    }

    const exportOrderBtn = document.getElementById('export-orders-csv-btn');
    if (exportOrderBtn) {
      exportOrderBtn.addEventListener('click', () => CSVExport.exportOrders());
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Dashboard.init();
});

if (typeof window !== 'undefined') {
  window.Dashboard = Dashboard;
}
