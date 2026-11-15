/**
 * Halaman Pesanan Saya > Status Pesanan
 * - Pelanggan yang login melihat daftar pesanannya (admin melihat semua)
 * - Siapa pun bisa melacak lewat nomor pesanan
 * - Garis status menampilkan tahap: Dibuat > Diproses > Dikirim > Selesai
 */

const OrderTracker = {
  STEPS: [
    { status: 'Pending',    label: 'Pesanan Dibuat', desc: 'Pesanan diterima, menunggu diproses.', icon: 'fa-receipt' },
    { status: 'Processing', label: 'Diproses',       desc: 'Pesanan sedang dikemas.',              icon: 'fa-box-open' },
    { status: 'Shipped',    label: 'Dikirim',        desc: 'Paket dalam perjalanan ke alamat Anda.', icon: 'fa-truck-fast' },
    { status: 'Completed',  label: 'Selesai',        desc: 'Paket sudah diterima.',                icon: 'fa-circle-check' }
  ],

  BADGE: {
    Pending:    'bg-amber-100 text-amber-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped:    'bg-indigo-100 text-indigo-800',
    Completed:  'bg-emerald-100 text-emerald-800',
    Cancelled:  'bg-rose-100 text-rose-800'
  },

  LABEL: { Pending: 'Dibuat', Processing: 'Diproses', Shipped: 'Dikirim', Completed: 'Selesai', Cancelled: 'Dibatalkan' },

  selectedId: null,

  init() {
    this.listPanel = document.getElementById('order-list-panel');
    this.listBox = document.getElementById('order-list');
    this.detail = document.getElementById('order-detail-panel');
    this.input = document.getElementById('track-input');

    document.getElementById('track-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.search(this.input.value);
    });

    this.listBox.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-order-id]');
      if (btn) this.show(btn.dataset.orderId);
    });

    this.detail.addEventListener('click', (e) => {
      const cancelBtn = e.target.closest('[data-cancel-order]');
      if (cancelBtn) this.cancel(cancelBtn.dataset.cancelOrder);
      const sample = e.target.closest('[data-sample-id]');
      if (sample) { this.input.value = sample.dataset.sampleId; this.search(sample.dataset.sampleId); }
    });

    window.addEventListener('skinora:auth_changed', () => this.renderList());

    this.renderList();

    const fromUrl = new URLSearchParams(window.location.search).get('id');
    const first = this.getMyOrders()[0];
    if (fromUrl) {
      this.input.value = fromUrl;
      this.search(fromUrl, true);
    } else if (first) {
      this.show(first.orderId);
    } else {
      this.renderEmpty();
    }
  },

  esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  rp(n) { return 'Rp ' + Number(n || 0).toLocaleString('id-ID'); },

  fmtDate(iso) {
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  },

  getMyOrders() {
    const user = Auth.getCurrentUser();
    if (!user) return [];
    return user.role === 'admin' ? Orders.getAll() : Orders.getByCustomer(user.email);
  },

  renderList() {
    const mine = this.getMyOrders();
    this.listPanel.classList.toggle('hidden', mine.length === 0);
    this.listBox.innerHTML = mine.map(o => `
      <button type="button" data-order-id="${this.esc(o.orderId)}"
        class="order-pick w-full text-left p-3.5 rounded-xl border border-pink-100 dark:border-gray-800 bg-white dark:bg-[#1E1A1E] ${o.orderId === this.selectedId ? 'is-selected' : ''}">
        <div class="flex items-center justify-between gap-2">
          <span class="font-mono text-xs font-bold text-[#C96F91]">${this.esc(o.orderId)}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${this.BADGE[o.status] || ''}">${this.LABEL[o.status] || o.status}</span>
        </div>
        <p class="text-xs text-gray-500 mt-1">${this.fmtDate(o.date)}</p>
        <p class="text-xs font-semibold mt-0.5 tabular-nums">${this.rp(o.total)} · ${o.items.reduce((s, i) => s + i.quantity, 0)} item</p>
      </button>`).join('');
  },

  search(raw, silent = false) {
    const id = String(raw || '').trim().toUpperCase();
    if (id.length < 6) {
      Notifications.toast('Masukkan nomor pesanan yang lengkap, contoh: SKN-202611-89F1.', 'error');
      return;
    }
    const order = Orders.getById(id);
    if (!order) {
      this.selectedId = null;
      this.renderList();
      this.detail.innerHTML = `
        <div class="p-8 text-center bg-white dark:bg-[#1E1A1E] rounded-3xl border border-rose-200 dark:border-rose-900/30">
          <i class="fa-regular fa-circle-question text-3xl text-rose-400 mb-3"></i>
          <h2 class="font-serif text-xl font-bold">Pesanan tidak ditemukan</h2>
          <p class="text-sm text-gray-500 mt-1">Nomor <span class="font-mono">${this.esc(id)}</span> tidak ada di perangkat ini. Periksa kembali penulisannya.</p>
        </div>`;
      if (!silent) Notifications.toast('Pesanan tidak ditemukan.', 'error');
      return;
    }
    this.show(order.orderId);
  },

  renderEmpty() {
    this.detail.innerHTML = `
      <div class="p-10 text-center bg-white dark:bg-[#1E1A1E] rounded-3xl border border-pink-100 dark:border-pink-900/30 shadow-sm">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 dark:bg-pink-950/40 text-[#C96F91] flex items-center justify-center text-2xl"><i class="fa-solid fa-box"></i></div>
        <h2 class="font-serif text-2xl font-bold">Belum ada pesanan yang ditampilkan</h2>
        <p class="text-sm text-gray-500 mt-2 max-w-md mx-auto">Masukkan nomor pesanan di atas, atau <a href="login.html?redirect=pesanan.html" class="text-[#C96F91] font-semibold hover:underline">masuk</a> untuk melihat semua pesanan akun Anda.</p>
        <p class="text-xs text-gray-400 mt-5">Ingin mencoba? <button type="button" data-sample-id="SKN-202611-89F1" class="font-mono text-[#C96F91] font-semibold hover:underline">SKN-202611-89F1</button></p>
        <a href="catalog.html" class="btn-primary text-sm mt-6 inline-flex"><span>Belanja sekarang</span></a>
      </div>`;
  },

  trackerHTML(order) {
    if (order.status === 'Cancelled') {
      return `
        <div class="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
          <i class="fa-solid fa-circle-xmark text-xl text-rose-500 mt-0.5"></i>
          <div><p class="font-bold text-rose-700 dark:text-rose-300 text-sm">Pesanan dibatalkan</p>
          <p class="text-xs text-rose-600/80 dark:text-rose-300/80 mt-0.5">Pesanan ini tidak diproses lebih lanjut dan stok produk sudah dikembalikan.</p></div>
        </div>`;
    }
    const current = Math.max(0, this.STEPS.findIndex(s => s.status === order.status));
    const last = this.STEPS.length - 1;
    return `
      <div class="tracker" style="--current:${current}" role="list" aria-label="Tahap pesanan">
        <span class="tracker-line" aria-hidden="true"></span>
        <span class="tracker-fill" aria-hidden="true"></span>
        ${this.STEPS.map((s, i) => `
          <div role="listitem" class="tracker-step ${i < current ? 'is-done' : ''} ${i === current ? 'is-current' : ''} ${i === current && i === last ? 'is-final' : ''}" ${i === current ? 'aria-current="step"' : ''}>
            <span class="tracker-node"><i class="fa-solid ${i < current ? 'fa-check' : s.icon}"></i></span>
            <span class="tracker-text">
              <span class="tracker-label block">${s.label}</span>
              <span class="tracker-desc block">${i === 0 ? this.fmtDate(order.date) : s.desc}</span>
            </span>
          </div>`).join('')}
      </div>`;
  },

  show(orderId) {
    const o = Orders.getById(orderId);
    if (!o) return;
    this.selectedId = orderId;
    this.renderList();
    history.replaceState(null, '', `pesanan.html?id=${encodeURIComponent(orderId)}`);

    this.detail.innerHTML = `
      <div class="bg-white dark:bg-[#1E1A1E] rounded-3xl border border-pink-100 dark:border-pink-900/30 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs text-gray-400">Nomor pesanan</p>
            <p class="font-mono text-lg font-bold text-[#C96F91] tracking-wide">${this.esc(o.orderId)}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold ${this.BADGE[o.status] || ''}">${this.LABEL[o.status] || this.esc(o.status)}</span>
        </div>

        <div class="p-6 pb-8">${this.trackerHTML(o)}</div>

        <div class="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 class="font-serif text-base font-bold mb-2">Pengiriman</h3>
            <p class="font-semibold">${this.esc(o.customerName)} <span class="font-normal text-gray-500">(${this.esc(o.customerPhone)})</span></p>
            <p class="text-gray-500 mt-1 leading-relaxed">${this.esc(o.deliveryAddress)}, ${this.esc(o.city)} ${this.esc(o.postalCode)}</p>
            <p class="text-gray-500 mt-2">Pembayaran: ${this.esc(o.paymentMethod)}</p>
          </div>
          <div>
            <h3 class="font-serif text-base font-bold mb-2">Rincian</h3>
            <ul class="divide-y divide-gray-100 dark:divide-gray-800">
              ${o.items.map(i => `
                <li class="py-2 flex items-center gap-3">
                  <img src="${this.esc(i.image)}" alt="" class="w-10 h-10 rounded-lg object-contain bg-pink-50/60 shrink-0" onerror="this.style.visibility='hidden'" />
                  <span class="flex-1 min-w-0 truncate">${this.esc(i.name)} <span class="text-gray-400">×${i.quantity}</span></span>
                  <span class="font-semibold tabular-nums">${this.rp(i.price * i.quantity)}</span>
                </li>`).join('')}
            </ul>
            <div class="flex justify-between pt-2 text-gray-500"><span>Ongkir</span><span class="tabular-nums">${o.shipping ? this.rp(o.shipping) : 'Gratis'}</span></div>
            <div class="flex justify-between pt-1 text-sm font-bold"><span>Total</span><span class="text-[#C96F91] tabular-nums">${this.rp(o.total)}</span></div>
          </div>
        </div>

        ${o.status === 'Pending' ? `
        <div class="px-6 py-4 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 flex-wrap">
          <p class="text-xs text-gray-500">Pesanan masih bisa dibatalkan sebelum diproses.</p>
          <button type="button" data-cancel-order="${this.esc(o.orderId)}" class="px-4 py-2 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors">Batalkan pesanan</button>
        </div>` : ''}
      </div>`;
  },

  async cancel(orderId) {
    const ok = await Notifications.confirm('Batalkan pesanan?', `Pesanan ${orderId} akan dibatalkan dan tidak bisa diaktifkan lagi.`, 'Ya, batalkan', 'Kembali');
    if (!ok) return;
    const res = Orders.cancel(orderId);
    if (!res.success) { Notifications.toast(res.message, 'error'); return; }
    this.show(orderId);
  }
};

document.addEventListener('DOMContentLoaded', () => OrderTracker.init());
