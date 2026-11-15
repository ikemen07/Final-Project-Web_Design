/**
 * Product Detail Page Controller for SKINORA
 * Renders contiguous purchase module, quantity counter, stock notice, and related products.
 */

const ProductDetail = {
  currentProduct: null,
  quantity: 1,

  init() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || 'CLN-001'; // Default showcase product

    this.currentProduct = Products.getById(productId);

    if (!this.currentProduct) {
      this.renderNotFound();
      return;
    }

    this.renderDetail();
    this.renderRelated();
    this.bindEvents();
  },

  renderDetail() {
    const p = this.currentProduct;
    document.title = `${p.name} — SKINORA`;

    // Breadcrumb
    const bcCat = document.getElementById('pdp-breadcrumb-category');
    if (bcCat) bcCat.textContent = p.category;
    const bcName = document.getElementById('pdp-breadcrumb-name');
    if (bcName) bcName.textContent = p.name;

    // Image
    const imgEl = document.getElementById('pdp-image');
    if (imgEl) {
      imgEl.src = p.image;
      imgEl.alt = p.name;
    }

    // Brand & Title
    const brandEl = document.getElementById('pdp-brand');
    if (brandEl) brandEl.textContent = p.brand;
    const titleEl = document.getElementById('pdp-title');
    if (titleEl) titleEl.textContent = p.name;

    // Price
    const priceEl = document.getElementById('pdp-price');
    if (priceEl) priceEl.textContent = `Rp ${p.price.toLocaleString('id-ID')}`;

    // Rating
    const ratingEl = document.getElementById('pdp-rating');
    if (ratingEl) ratingEl.textContent = p.rating.toFixed(1);

    // Tags
    const catTag = document.getElementById('pdp-tag-category');
    if (catTag) catTag.textContent = p.category;
    const skinTag = document.getElementById('pdp-tag-skin');
    if (skinTag) {
      skinTag.textContent = p.skinType;
      skinTag.className = `skin-tag skin-tag-${Products._mapSkinSlug(p.skinType)}`;
    }

    // Stock Status
    const stockEl = document.getElementById('pdp-stock-status');
    const addToCartBtn = document.getElementById('pdp-add-to-cart');
    if (stockEl) {
      if (p.stock <= 0) {
        stockEl.innerHTML = '<span class="text-rose-600 font-semibold"><i class="fa-solid fa-circle-xmark mr-1"></i> Stok Habis</span>';
        if (addToCartBtn) {
          addToCartBtn.disabled = true;
          addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
      } else if (p.stock <= 5) {
        stockEl.innerHTML = `<span class="text-amber-600 font-semibold"><i class="fa-solid fa-triangle-exclamation mr-1"></i> Stok Menipis! Tersisa ${p.stock} unit</span>`;
      } else {
        stockEl.innerHTML = `<span class="text-emerald-600 font-semibold"><i class="fa-solid fa-circle-check mr-1"></i> Tersedia (${p.stock} unit dalam inventaris)</span>`;
      }
    }

    // Description
    const descEl = document.getElementById('pdp-description');
    if (descEl) descEl.textContent = p.description;

    // Wishlist Button state
    this.updateWishlistBtn();
  },

  updateWishlistBtn() {
    const btn = document.getElementById('pdp-wishlist-btn');
    if (!btn || !this.currentProduct) return;

    const isFav = Wishlist.has(this.currentProduct.id);
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span');

    if (isFav) {
      if (icon) {
        icon.className = 'fa-solid fa-heart text-[#C96F91] text-base';
      }
      if (text) text.textContent = 'Tersimpan di Wishlist';
      btn.classList.add('border-[#C96F91]', 'bg-pink-50/50', 'dark:bg-pink-950/20');
    } else {
      if (icon) {
        icon.className = 'fa-regular fa-heart text-gray-500 text-base';
      }
      if (text) text.textContent = 'Simpan ke Wishlist';
      btn.classList.remove('border-[#C96F91]', 'bg-pink-50/50', 'dark:bg-pink-950/20');
    }
  },

  bindEvents() {
    const p = this.currentProduct;
    if (!p) return;

    // Quantity Stepper
    const qtyInput = document.getElementById('pdp-qty-input');
    const minusBtn = document.getElementById('pdp-qty-minus');
    const plusBtn = document.getElementById('pdp-qty-plus');

    if (minusBtn && qtyInput) {
      minusBtn.addEventListener('click', () => {
        if (this.quantity > 1) {
          this.quantity--;
          qtyInput.value = this.quantity;
        }
      });
    }

    if (plusBtn && qtyInput) {
      plusBtn.addEventListener('click', () => {
        if (this.quantity < p.stock) {
          this.quantity++;
          qtyInput.value = this.quantity;
        } else {
          Notifications.toast(`Maksimum pesanan adalah ${p.stock} unit sesuai stok tersedia.`, 'warning');
        }
      });
    }

    // Add to Cart
    const addBtn = document.getElementById('pdp-add-to-cart');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        Cart.buyNow(p, this.quantity);
      });
    }

    // Wishlist
    const wishBtn = document.getElementById('pdp-wishlist-btn');
    if (wishBtn) {
      wishBtn.addEventListener('click', () => {
        Wishlist.toggle(p);
        this.updateWishlistBtn();
      });
    }
  },

  renderRelated() {
    const container = document.getElementById('pdp-related-grid');
    if (!container || !this.currentProduct) return;

    const related = Products.getRelated(this.currentProduct, 4);
    if (related.length === 0) {
      container.innerHTML = '<p class="text-xs text-gray-400">Tidak ada produk terkait saat ini.</p>';
      return;
    }

    container.innerHTML = related.map(p => renderProductCardHTML(p)).join('');
    Wishlist.syncHeartButtons();
  },

  renderNotFound() {
    const main = document.getElementById('pdp-main-content');
    if (main) {
      main.innerHTML = `
        <div class="py-24 text-center">
          <i class="fa-solid fa-box-open text-4xl text-gray-300 mb-4"></i>
          <h2 class="text-2xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-2">Produk Tidak Ditemukan</h2>
          <p class="text-sm text-gray-500 mb-6">Produk yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
          <a href="catalog.html" class="btn-primary">Kembali ke Katalog</a>
        </div>
      `;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ProductDetail.init();
});

if (typeof window !== 'undefined') {
  window.ProductDetail = ProductDetail;
}
