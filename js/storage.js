/**
 * Local Storage Architecture & Management for SKINORA
 * Encapsulates persistence, fallback seeding, and type-safe helpers.
 */

const STORAGE_KEYS = {
  PRODUCTS: 'skinora_products',
  CATEGORIES: 'skinora_categories',
  USERS: 'skinora_users',
  SESSION: 'skinora_session',
  CART: 'skinora_cart',
  WISHLIST: 'skinora_wishlist',
  ORDERS: 'skinora_orders',
  THEME: 'skinora_theme'
};

const Storage = {
  /**
   * Safe JSON parse with fallback
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined) return defaultValue;
      try {
        return JSON.parse(item);
      } catch {
        // Return raw string if not JSON (e.g. 'light' or 'dark')
        return item;
      }
    } catch (err) {
      console.warn(`[Storage] Failed to read ${key}:`, err);
      return defaultValue;
    }
  },

  /**
   * Safe JSON serialize
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom storage event for in-page component synchronization
      window.dispatchEvent(new CustomEvent('skinora:storage_updated', { detail: { key, value } }));
      return true;
    } catch (err) {
      console.error(`[Storage] Failed to write ${key}:`, err);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent('skinora:storage_updated', { detail: { key, value: null } }));
    } catch (err) {
      console.error(`[Storage] Failed to remove ${key}:`, err);
    }
  },

  /**
   * Initialize and seed Local Storage if empty
   */
  init() {
    const initial = window.SKINORA_INITIAL || {};

    // 1. Products (Ensure full 35 products)
    const existingProducts = this.get(STORAGE_KEYS.PRODUCTS);
    if (!existingProducts || !Array.isArray(existingProducts) || existingProducts.length === 0) {
      this.set(STORAGE_KEYS.PRODUCTS, initial.products || []);
      console.log(`[Storage] Seeded 35 initial products.`);
    } else {
      let needsUpdate = false;
      existingProducts.forEach(p => {
        if (p.image && p.image.endsWith('.jpg') && p.image.includes('assets/images/products/')) {
          p.image = p.image.replace('.jpg', '.svg');
          needsUpdate = true;
        }
      });
      if (needsUpdate) {
        this.set(STORAGE_KEYS.PRODUCTS, existingProducts);
      }
    }

    // 2. Categories (7 categories)
    const existingCategories = this.get(STORAGE_KEYS.CATEGORIES);
    if (!existingCategories || !Array.isArray(existingCategories) || existingCategories.length === 0) {
      this.set(STORAGE_KEYS.CATEGORIES, initial.categories || []);
    }

    // 3. Users (Admin and sample customer)
    const existingUsers = this.get(STORAGE_KEYS.USERS);
    if (!existingUsers || !Array.isArray(existingUsers) || existingUsers.length === 0) {
      this.set(STORAGE_KEYS.USERS, initial.users || []);
    }

    // 4. Orders (Initial realistic orders)
    const existingOrders = this.get(STORAGE_KEYS.ORDERS);
    if (!existingOrders || !Array.isArray(existingOrders) || existingOrders.length === 0) {
      this.set(STORAGE_KEYS.ORDERS, initial.orders || []);
    }

    // 5. Cart (Default empty array)
    if (!this.get(STORAGE_KEYS.CART)) {
      this.set(STORAGE_KEYS.CART, []);
    }

    // 6. Wishlist (Default empty array of product IDs)
    if (!this.get(STORAGE_KEYS.WISHLIST)) {
      this.set(STORAGE_KEYS.WISHLIST, []);
    }

    // 7. Theme (Default light)
    if (!this.get(STORAGE_KEYS.THEME)) {
      this.set(STORAGE_KEYS.THEME, 'light');
    }
  },

  /**
   * Helper to reset storage to factory demo data
   */
  resetToDefault() {
    const initial = window.SKINORA_INITIAL || {};
    this.set(STORAGE_KEYS.PRODUCTS, initial.products || []);
    this.set(STORAGE_KEYS.CATEGORIES, initial.categories || []);
    this.set(STORAGE_KEYS.USERS, initial.users || []);
    this.set(STORAGE_KEYS.ORDERS, initial.orders || []);
    this.set(STORAGE_KEYS.CART, []);
    this.set(STORAGE_KEYS.WISHLIST, []);
    this.set(STORAGE_KEYS.THEME, 'light');
    console.log('[Storage] Reset to default seed data successfully.');
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.Storage = Storage;
  window.STORAGE_KEYS = STORAGE_KEYS;
}
