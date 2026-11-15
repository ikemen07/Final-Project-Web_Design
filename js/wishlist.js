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
