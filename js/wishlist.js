/**
 * Wishlist Management Module for SKINORA
 * Handles bookmarking products, dynamic heart toggling, and navbar counters.
 */

const Wishlist = {
  /**
   * Get all wishlist product IDs
   */
  getIds() {
    return Storage.get(STORAGE_KEYS.WISHLIST, []);
  },

  /**
   * Get full product objects in wishlist
   */
  getProducts() {
    const ids = this.getIds();
    const all = Products.getAll();
    return ids.map(id => all.find(p => p.id === id)).filter(Boolean);
  },

  /**
   * Check if a product is in wishlist
   */
  has(productId) {
    return this.getIds().includes(productId);
  },

  /**
   * Toggle product in wishlist
   */
  toggle(product) {
    if (!product || !product.id) return false;

    let ids = this.getIds();
    const exists = ids.includes(product.id);

    if (exists) {
      ids = ids.filter(id => id !== product.id);
      Storage.set(STORAGE_KEYS.WISHLIST, ids);
      Notifications.toast(`${product.name} dihapus dari Wishlist.`, 'info');
    } else {
      ids.push(product.id);
      Storage.set(STORAGE_KEYS.WISHLIST, ids);
      Notifications.toast(`${product.name} ditambahkan ke Wishlist!`, 'success');
    }

    this.updateBadge();
    this.syncHeartButtons();
    return !exists;
  },

  /**
   * Move item from wishlist to shopping cart
   */
  moveToCart(productId) {
    const product = Products.getById(productId);
    if (!product) return;

    if (Cart.addItem(product, 1)) {
      // Remove from wishlist
      let ids = this.getIds().filter(id => id !== productId);
      Storage.set(STORAGE_KEYS.WISHLIST, ids);
      this.updateBadge();
      this.syncHeartButtons();
      window.dispatchEvent(new CustomEvent('skinora:wishlist_rendered'));
    }
  },

  /**
   * Update numeric wishlist badge in navbar
   */
  updateBadge() {
    const badges = document.querySelectorAll('.wishlist-badge');
    const count = this.getIds().length;

    this.renderDrawer();

    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    });
  },

  /**
   * Panel favorit: hanya menampilkan produk yang di-like
   */
  esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  openDrawer() {
    const d = document.getElementById('wishlist-drawer');
    if (!d) return;
    this.renderDrawer();
    d.classList.remove('hidden');
  },

  closeDrawer() {
    const d = document.getElementById('wishlist-drawer');
    if (d) d.classList.add('hidden');
  },

  renderDrawer() {
    const body = document.getElementById('wishlist-drawer-body');
    if (!body) return;
    const items = this.getProducts();

    if (items.length === 0) {
      body.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 text-[#C96F91] flex items-center justify-center text-2xl"><i class="fa-regular fa-heart"></i></div>
          <p class="font-serif text-xl font-bold">Belum ada produk favorit</p>
          <p class="text-xs text-gray-500 mt-2">Tekan ikon hati pada produk, lalu produknya muncul di sini.</p>
          <a href="catalog.html" class="btn-primary text-xs mt-5 inline-flex"><span>Lihat produk</span></a>
        </div>`;
      return;
    }

    body.innerHTML = items.map(p => `
      <div class="flex gap-3 p-3 rounded-2xl border border-pink-100">
        <a href="product.html?id=${this.esc(p.id)}" class="shrink-0">
          <img src="${this.esc(p.image)}" alt="${this.esc(p.name)}" class="w-16 h-16 rounded-xl object-contain bg-pink-50/60" onerror="this.style.visibility='hidden'" />
        </a>
        <div class="flex-1 min-w-0">
          <a href="product.html?id=${this.esc(p.id)}" class="block text-xs font-semibold line-clamp-2 hover:text-[#C96F91]">${this.esc(p.name)}</a>
          <p class="text-xs font-bold mt-1 tabular-nums">Rp ${Number(p.price).toLocaleString('id-ID')}</p>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" data-wishlist-order="${this.esc(p.id)}" ${p.stock <= 0 ? 'disabled' : ''} class="px-3 py-1 rounded-full bg-[#C96F91] text-white text-[11px] font-semibold ${p.stock <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B55A7E]'}">${p.stock <= 0 ? 'Habis' : 'Pesan'}</button>
            <button type="button" data-wishlist-remove="${this.esc(p.id)}" class="px-3 py-1 rounded-full border border-gray-200 text-[11px] font-semibold text-gray-500 hover:text-rose-600 hover:border-rose-300">Hapus</button>
          </div>
        </div>
      </div>`).join('');
  },

  /**
   * Sync visual heart states across all rendered cards on the page
   */
  syncHeartButtons() {
    const ids = this.getIds();
    const heartBtns = document.querySelectorAll('[data-wishlist-id]');

    heartBtns.forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      const isFavorited = ids.includes(id);
      const icon = btn.querySelector('i');

      if (icon) {
        if (isFavorited) {
          icon.classList.remove('fa-regular', 'text-gray-400');
          icon.classList.add('fa-solid', 'text-[#C96F91]');
          btn.setAttribute('aria-label', 'Hapus dari Wishlist');
        } else {
          icon.classList.remove('fa-solid', 'text-[#C96F91]');
          icon.classList.add('fa-regular', 'text-gray-400');
          btn.setAttribute('aria-label', 'Tambah ke Wishlist');
        }
      }
    });
  }
};

document.addEventListener('click', (e) => {
  if (e.target.closest('.wishlist-open-btn')) { Wishlist.openDrawer(); return; }
  if (e.target.closest('[data-wishlist-close]')) { Wishlist.closeDrawer(); return; }
  const rm = e.target.closest('[data-wishlist-remove]');
  if (rm) { Wishlist.toggle(Products.getById(rm.dataset.wishlistRemove)); return; }
  const order = e.target.closest('[data-wishlist-order]');
  if (order) Cart.buyNow(Products.getById(order.dataset.wishlistOrder), 1);
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') Wishlist.closeDrawer(); });

document.addEventListener('DOMContentLoaded', () => {
  Wishlist.updateBadge();
  Wishlist.syncHeartButtons();
});

window.addEventListener('skinora:storage_updated', (e) => {
  if (e.detail && e.detail.key === STORAGE_KEYS.WISHLIST) {
    Wishlist.updateBadge();
    Wishlist.syncHeartButtons();
  }
});

if (typeof window !== 'undefined') {
  window.Wishlist = Wishlist;
}
