/**
 * Shopping Cart & Checkout Controller for SKINORA
 * Handles item table rendering, stock clamping, form validation, and simulated payment.
 */

const Checkout = {
  init() {
    this.renderCart();
    this.prefillUser();
    this.bindEvents();
  },

  prefillUser() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    const phoneInput = document.getElementById('checkout-phone');
    const addressInput = document.getElementById('checkout-address');
    const cityInput = document.getElementById('checkout-city');
    const postalInput = document.getElementById('checkout-postal');

    if (nameInput && !nameInput.value) nameInput.value = user.name || '';
    if (emailInput && !emailInput.value) emailInput.value = user.email || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
    if (addressInput && !addressInput.value) addressInput.value = user.address || '';
    if (cityInput && !cityInput.value) cityInput.value = user.city || '';
    if (postalInput && !postalInput.value) postalInput.value = user.postalCode || '';
  },

  renderCart() {
    const items = Cart.getItems();
    const tableBody = document.getElementById('cart-items-tbody');
    const emptyState = document.getElementById('cart-empty-view');
    const filledState = document.getElementById('cart-filled-view');

    if (!tableBody || !emptyState || !filledState) return;

    if (items.length === 0) {
      emptyState.classList.remove('hidden');
      filledState.classList.add('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    filledState.classList.remove('hidden');

    tableBody.innerHTML = items.map(item => {
      const p = item.product;
      const lineTotal = p.price * item.quantity;
      return `
        <tr class="border-b border-gray-100 dark:border-gray-800">
          <!-- Product Info -->
          <td class="py-4 px-2">
            <div class="flex items-center gap-3">
              <img src="${p.image}" alt="${p.name}" class="w-16 h-16 object-contain rounded-xl bg-pink-50/60 dark:bg-pink-950/20 p-1 shrink-0 border border-pink-100/40" onerror="this.src='assets/images/banners/hero-banner.jpg'" />
              <div class="min-w-0">
                <span class="text-[10px] uppercase font-bold text-[#C96F91] tracking-wider">${p.brand || 'SKINORA'}</span>
                <h4 class="font-semibold text-xs text-gray-800 dark:text-gray-200 line-clamp-1">${p.name}</h4>
                <div class="flex items-center gap-2 mt-0.5 text-[11px] text-gray-400">
                  <span>${p.skinType}</span>
                  <span>·</span>
                  <span class="tabular-nums">Rp ${p.price.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </td>

          <!-- Quantity Stepper -->
          <td class="py-4 px-2 text-center">
            <div class="inline-flex items-center border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden bg-white dark:bg-[#1E1A1E]">
              <button 
                type="button" 
                onclick="Checkout.changeQty('${p.id}', ${item.quantity - 1})"
                class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Kurangi jumlah"
              >
                <i class="fa-solid fa-minus text-[10px]"></i>
              </button>
              <span class="w-8 text-center text-xs font-bold text-gray-800 dark:text-gray-200 tabular-nums">
                ${item.quantity}
              </span>
              <button 
                type="button" 
                onclick="Checkout.changeQty('${p.id}', ${item.quantity + 1})"
                class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Tambah jumlah"
              >
                <i class="fa-solid fa-plus text-[10px]"></i>
              </button>
            </div>
          </td>

          <!-- Subtotal -->
          <td class="py-4 px-2 text-right font-bold text-xs text-gray-900 dark:text-gray-100 tabular-nums">
            Rp ${lineTotal.toLocaleString('id-ID')}
          </td>

          <!-- Remove Action -->
          <td class="py-4 px-2 text-center">
            <button 
              type="button" 
              onclick="Checkout.removeItem('${p.id}')"
              class="w-8 h-8 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              aria-label="Hapus produk"
            >
              <i class="fa-regular fa-trash-can text-xs"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    this.renderSummary();
  },

  renderSummary() {
    const totals = Cart.getTotals();

    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');
    const freeShippingProgress = document.getElementById('free-shipping-progress');
    const freeShippingNotice = document.getElementById('free-shipping-notice');

    if (subtotalEl) subtotalEl.textContent = `Rp ${totals.subtotal.toLocaleString('id-ID')}`;

    if (shippingEl) {
      if (totals.shipping === 0) {
        shippingEl.innerHTML = '<span class="text-emerald-600 font-bold uppercase text-[11px]">Gratis</span>';
      } else {
        shippingEl.textContent = `Rp ${totals.shipping.toLocaleString('id-ID')}`;
      }
    }

    if (totalEl) totalEl.textContent = `Rp ${totals.total.toLocaleString('id-ID')}`;

    // Free shipping threshold progress bar
    if (freeShippingProgress && freeShippingNotice) {
      const remaining = Math.max(0, totals.freeShippingThreshold - totals.subtotal);
      const percentage = Math.min(100, (totals.subtotal / totals.freeShippingThreshold) * 100);

      freeShippingProgress.style.width = `${percentage}%`;

      if (totals.isFreeShipping) {
        freeShippingNotice.innerHTML = '<span class="text-emerald-600 font-bold">🎉 Selamat! Anda mendapatkan Gratis Ongkir!</span>';
      } else {
        freeShippingNotice.innerHTML = `Tambah belanja <strong>Rp ${remaining.toLocaleString('id-ID')}</strong> lagi untuk <strong>Gratis Ongkir</strong>`;
      }
    }
  },

  changeQty(productId, newQty) {
    Cart.updateQuantity(productId, newQty);
    this.renderCart();
  },

  async removeItem(productId) {
    const confirmed = await Notifications.confirm(
      'Hapus Produk?',
      'Apakah Anda yakin ingin menghapus produk ini dari keranjang belanja?'
    );
    if (confirmed) {
      Cart.removeItem(productId);
      this.renderCart();
    }
  },

  bindEvents() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => this.handleCheckoutSubmit(e));
    }
  },

  handleCheckoutSubmit(e) {
    e.preventDefault();

    const items = Cart.getItems();
    if (items.length === 0) {
      Notifications.toast('Keranjang belanja Anda masih kosong.', 'error');
      return;
    }

    const form = e.target;
    const formData = {
      name: form['name']?.value || '',
      email: form['email']?.value || '',
      phone: form['phone']?.value || '',
      address: form['address']?.value || '',
      city: form['city']?.value || '',
      postalCode: form['postalCode']?.value || '',
      paymentMethod: form['paymentMethod']?.value || ''
    };

    // Client-side Validation
    const validation = Validation.validateCheckout(formData);
    if (!validation.isValid) {
      // Clear old errors
      document.querySelectorAll('.validation-error-msg').forEach(el => el.remove());

      // Show specific errors under fields
      if (validation.errors.name) Validation.showError(form['name'], validation.errors.name);
      if (validation.errors.email) Validation.showError(form['email'], validation.errors.email);
      if (validation.errors.phone) Validation.showError(form['phone'], validation.errors.phone);
      if (validation.errors.address) Validation.showError(form['address'], validation.errors.address);
      if (validation.errors.city) Validation.showError(form['city'], validation.errors.city);
      if (validation.errors.postalCode) Validation.showError(form['postalCode'], validation.errors.postalCode);
      if (validation.errors.paymentMethod) {
        Notifications.toast(validation.errors.paymentMethod, 'error');
      }

      Notifications.toast('Harap periksa kembali data formulir yang belum sesuai.', 'error');
      return;
    }

    // Place Order via Orders module
    const user = Auth.getCurrentUser();
    const totals = Cart.getTotals();

    const orderResult = Orders.create({
      customerId: user ? user.id : null,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      deliveryAddress: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      paymentMethod: formData.paymentMethod,
      items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total
    });

    if (orderResult.success) {
      this.showOrderConfirmation(orderResult.order);
      this.renderCart();
    }
  },

  showOrderConfirmation(order) {
    const modalHtml = `
      <div class="text-left space-y-3 font-sans text-xs">
        <div class="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-xl border border-pink-100 dark:border-pink-900/40 text-center">
          <p class="text-xs text-gray-500 mb-1">Nomor Pesanan Anda</p>
          <p class="text-base font-bold text-[#C96F91] font-mono tracking-wider">${order.orderId}</p>
          <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            Status: ${order.status}
          </span>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 pt-2">
          <p class="font-bold text-gray-800 dark:text-gray-200 mb-1">Informasi Pengiriman:</p>
          <p><strong>Penerima:</strong> ${order.customerName} (${order.customerPhone})</p>
          <p><strong>Alamat:</strong> ${order.deliveryAddress}, ${order.city} ${order.postalCode}</p>
          <p><strong>Metode Pembayaran:</strong> ${order.paymentMethod}</p>
        </div>

        <div class="border-t border-gray-100 dark:border-gray-800 pt-2">
          <p class="font-bold text-gray-800 dark:text-gray-200 mb-1">Rincian Pembelian:</p>
          <ul class="divide-y divide-gray-100 dark:divide-gray-800 max-h-36 overflow-y-auto pr-1">
            ${order.items.map(item => `
              <li class="py-1.5 flex justify-between">
                <span class="truncate max-w-[200px]">${item.name} (x${item.quantity})</span>
                <span class="font-semibold tabular-nums">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-sm font-bold">
          <span>Total Pembayaran:</span>
          <span class="text-[#C96F91] tabular-nums">Rp ${order.total.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;

    Notifications.modal(
      'Pesanan Berhasil Dibuat!',
      modalHtml,
      'success',
      'Lacak Pesanan Saya'
    ).then(() => {
      window.location.href = 'pesanan.html?id=' + encodeURIComponent(order.orderId);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Checkout.init();
});

if (typeof window !== 'undefined') {
  window.Checkout = Checkout;
}
