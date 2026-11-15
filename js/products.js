/**
 * Product & Category Operations Module for SKINORA
 * Handles CRUD operations, category management, and data retrieval.
 */

const Products = {
  /**
   * Retrieve all products from storage
   */
  getAll() {
    return Storage.get(STORAGE_KEYS.PRODUCTS, []);
  },

  /**
   * Find product by unique ID
   */
  getById(id) {
    if (!id) return null;
    const products = this.getAll();
    return products.find(p => p.id === id) || null;
  },

  /**
   * Get featured products for homepage showcase
   */
  getFeatured() {
    return this.getAll().filter(p => p.featured);
  },

  /**
   * Get best sellers (products with high rating & stock activity)
   */
  getBestSellers(limit = 4) {
    const products = this.getAll();
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },

  /**
   * Get products by skin type
   */
  getBySkinType(skinType) {
    return this.getAll().filter(p => p.skinType.toLowerCase() === skinType.toLowerCase());
  },

  /**
   * Get related products for detail page
   */
  getRelated(currentProduct, limit = 4) {
    if (!currentProduct) return [];
    return this.getAll()
      .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.skinType === currentProduct.skinType))
      .slice(0, limit);
  },

  /**
   * CREATE: Add a new product
   */
  create(productData) {
    const products = this.getAll();

    // Generate unique product code if not provided
    const catCode = (productData.category || 'PRD').substring(0, 3).toUpperCase();
    const count = products.filter(p => p.category === productData.category).length + 1;
    const newId = productData.id || `${catCode}-${String(count).padStart(3, '0')}`;

    // Verify ID uniqueness
    if (products.some(p => p.id === newId)) {
      return { success: false, message: `ID Produk ${newId} sudah digunakan.` };
    }

    const newProduct = {
      id: newId,
      name: productData.name.trim(),
      category: productData.category,
      skinType: productData.skinType,
      price: Number(productData.price),
      description: productData.description.trim(),
      image: productData.image && productData.image.trim() !== '' 
        ? productData.image.trim() 
        : `assets/images/products/${productData.category.toLowerCase()}-${this._mapSkinSlug(productData.skinType)}.svg`,
      stock: Number(productData.stock),
      rating: productData.rating ? Number(productData.rating) : 4.8,
      brand: productData.brand.trim(),
      featured: Boolean(productData.featured)
    };

    products.unshift(newProduct);
    Storage.set(STORAGE_KEYS.PRODUCTS, products);

    return { success: true, product: newProduct, message: 'Produk baru berhasil ditambahkan.' };
  },

  /**
   * UPDATE: Edit an existing product
   */
  update(id, updatedData) {
    const products = this.getAll();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return { success: false, message: 'Produk tidak ditemukan.' };
    }

    products[index] = {
      ...products[index],
      name: updatedData.name ? updatedData.name.trim() : products[index].name,
      category: updatedData.category || products[index].category,
      skinType: updatedData.skinType || products[index].skinType,
      price: updatedData.price !== undefined ? Number(updatedData.price) : products[index].price,
      stock: updatedData.stock !== undefined ? Number(updatedData.stock) : products[index].stock,
      description: updatedData.description !== undefined ? updatedData.description.trim() : products[index].description,
      brand: updatedData.brand ? updatedData.brand.trim() : products[index].brand,
      image: updatedData.image && updatedData.image.trim() !== '' ? updatedData.image.trim() : products[index].image,
      featured: updatedData.featured !== undefined ? Boolean(updatedData.featured) : products[index].featured,
      rating: updatedData.rating !== undefined ? Number(updatedData.rating) : products[index].rating
    };

    Storage.set(STORAGE_KEYS.PRODUCTS, products);
    return { success: true, product: products[index], message: 'Produk berhasil diperbarui.' };
  },

  /**
   * DELETE: Remove product with safety check
   */
  delete(id) {
    const products = this.getAll();
    const filtered = products.filter(p => p.id !== id);

    if (filtered.length === products.length) {
      return { success: false, message: 'Produk tidak ditemukan.' };
    }

    Storage.set(STORAGE_KEYS.PRODUCTS, filtered);
    return { success: true, message: 'Produk berhasil dihapus.' };
  },

  /**
   * Deduct stock upon successful checkout
   */
  deductStock(purchasedItems) {
    const products = this.getAll();
    purchasedItems.forEach(item => {
      const p = products.find(prod => prod.id === item.id);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
      }
    });
    Storage.set(STORAGE_KEYS.PRODUCTS, products);
  },

  /**
   * CATEGORIES CRUD
   */
  getCategories() {
    return Storage.get(STORAGE_KEYS.CATEGORIES, []);
  },

  createCategory(categoryData) {
    const categories = this.getCategories();
    const id = categoryData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (categories.some(c => c.id === id || c.name.toLowerCase() === categoryData.name.toLowerCase())) {
      return { success: false, message: 'Kategori sudah ada.' };
    }

    const newCat = {
      id,
      name: categoryData.name.trim(),
      description: categoryData.description ? categoryData.description.trim() : '',
      icon: categoryData.icon || 'fa-tag'
    };

    categories.push(newCat);
    Storage.set(STORAGE_KEYS.CATEGORIES, categories);
    return { success: true, category: newCat, message: 'Kategori berhasil ditambahkan.' };
  },

  updateCategory(id, updatedData) {
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return { success: false, message: 'Kategori tidak ditemukan.' };

    categories[index] = {
      ...categories[index],
      name: updatedData.name ? updatedData.name.trim() : categories[index].name,
      description: updatedData.description !== undefined ? updatedData.description.trim() : categories[index].description,
      icon: updatedData.icon || categories[index].icon
    };

    Storage.set(STORAGE_KEYS.CATEGORIES, categories);
    return { success: true, message: 'Kategori berhasil diperbarui.' };
  },

  deleteCategory(id) {
    // Check if any product is currently using this category
    const cat = this.getCategories().find(c => c.id === id);
    if (!cat) return { success: false, message: 'Kategori tidak ditemukan.' };

    const inUse = this.getAll().some(p => p.category.toLowerCase() === cat.name.toLowerCase());
    if (inUse) {
      return {
        success: false,
        message: `Kategori "${cat.name}" tidak dapat dihapus karena masih digunakan oleh produk di katalog.`
      };
    }

    const filtered = this.getCategories().filter(c => c.id !== id);
    Storage.set(STORAGE_KEYS.CATEGORIES, filtered);
    return { success: true, message: 'Kategori berhasil dihapus.' };
  },

  _mapSkinSlug(skinType) {
    const map = {
      'Berminyak': 'oily',
      'Kering': 'dry',
      'Kombinasi': 'combination',
      'Sensitif': 'sensitive',
      'Berjerawat': 'acne'
    };
    return map[skinType] || 'oily';
  }
};

if (typeof window !== 'undefined') {
  window.Products = Products;
}
