/**
 * Shopping Cart Management Module for SKINORA
 * Handles cart item state, stock clamping, quantity math, and dynamic navbar counters.
 */

const Cart = {
  /**
   * Get all items in cart
   */
  getItems() {
    return Storage.get(STORAGE_KEYS.CART, []);
  },

  /**
   * Add product to cart with stock validation
   */
  addItem(product, quantity = 1) {
    if (!product || product.stock <= 0) {
      Notifications.toast('Maaf, produk ini sedang habis stok.', 'error');
      return false;
    }

    const cart = this.getItems();
    const existingIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      const newQty = cart[existingIndex].quantity + quantity;
      if (newQty > product.stock) {
        Notifications.toast(`Jumlah melebihi stok yang tersedia (Maks: ${product.stock}).`, 'warning');
        cart[existingIndex].quantity = product.stock;
      } else {
        cart[existingIndex].quantity = newQty;
        Notifications.toast(`${product.name} diperbarui di keranjang belanja.`, 'success');
      }
    } else {
      const validQty = Math.min(Math.max(1, quantity), product.stock);
      cart.push({
        product: {
          id: product.id,
          name: product.name,
          category: product.category,
          skinType: product.skinType,
          price: product.price,
          image: product.image,
          stock: product.stock,
          brand: product.brand
        },
        quantity: validQty
      });
      Notifications.toast(`${product.name} berhasil ditambahkan ke keranjang.`, 'success');
    }

    Storage.set(STORAGE_KEYS.CART, cart);
    this.updateBadge();
    return true;
  },

  /**
   * Pesan langsung: masukkan produk lalu buka halaman checkout.
   * (Tidak ada menu keranjang di navigasi; keranjang hanya jadi daftar item di halaman checkout.)
   */
  buyNow(product, quantity = 1) {
    if (this.addItem(product, quantity)) {
      setTimeout(() => { window.location.href = 'cart.html'; }, 500);
    }
  },

  /**
   * Update quantity of an existing item in cart
   */
  updateQuantity(productId, newQuantity) {
    const cart = this.getItems();
    const item = cart.find(i => i.product.id === productId);
    if (!item) return false;

    // Fetch fresh product data from storage to verify stock
    const freshProduct = Products.getById(productId) || item.product;

    if (newQuantity <= 0) {
      return this.removeItem(productId);
    }

    if (newQuantity > freshProduct.stock) {
      Notifications.toast(`Jumlah mencapai batas stok (${freshProduct.stock} unit).`, 'warning');
      item.quantity = freshProduct.stock;
    } else {
      item.quantity = Math.floor(newQuantity);
    }

    Storage.set(STORAGE_KEYS.CART, cart);
    this.updateBadge();
    return true;
  },

  /**
   * Remove item from cart
   */
  removeItem(productId) {
    const cart = this.getItems();
    const filtered = cart.filter(item => item.product.id !== productId);
    Storage.set(STORAGE_KEYS.CART, filtered);
    this.updateBadge();
    Notifications.toast('Produk dihapus dari keranjang.', 'info');
    return true;
  },

  /**
   * Clear all items in cart
   */
  clear() {
    Storage.set(STORAGE_KEYS.CART, []);
    this.updateBadge();
  },

  /**
   * Calculate cart financial totals
   */
  getTotals(flatShipping = 20000) {
    const items = this.getItems();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const shipping = subtotal === 0 ? 0 : flatShipping;
    const total = subtotal + shipping;

    return {
      count,
      subtotal,
      shipping,
      total
    };
  },

  /**
   * Update numeric cart badge in navbar across all pages
   */
  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const { count } = this.getTotals();

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
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
});

window.addEventListener('skinora:storage_updated', (e) => {
  if (e.detail && e.detail.key === STORAGE_KEYS.CART) {
    Cart.updateBadge();
  }
});

if (typeof window !== 'undefined') {
  window.Cart = Cart;
}
