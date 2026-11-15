/**
 * SKINORA AI Skincare Recommendation Assistant
 * Rule-based intelligent beauty consultant that matches customer skin profile and budget
 * directly against the 35-item product catalog.
 */

const Assistant = {
  state: {
    isOpen: false,
    step: 1,
    skinType: null,
    category: null,
    budget: null,
    history: []
  },

  init() {
    this.createWidgetDOM();
    this.bindEvents();
  },

  createWidgetDOM() {
    if (document.getElementById('skinora-assistant-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'skinora-assistant-widget';
    widget.innerHTML = `
      <!-- Floating Trigger Button -->
      <button id="assistant-trigger" class="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#C96F91] hover:bg-[#B55A7E] text-white rounded-full shadow-xl shadow-pink-500/25 transition-all duration-300 hover:scale-105 group" aria-label="Buka Konsultan Kulit AI">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <i class="fa-solid fa-sparkles text-sm text-pink-200"></i>
        <span class="text-xs font-semibold tracking-wide pr-1">Konsultan AI</span>
      </button>

      <!-- Assistant Modal / Drawer Container -->
      <div id="assistant-drawer" class="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#1E1A1E] rounded-3xl shadow-2xl border border-pink-100 dark:border-pink-900/30 overflow-hidden transform translate-y-6 opacity-0 pointer-events-none transition-all duration-300 flex flex-col max-h-[620px]">
        <!-- Header -->
        <div class="px-5 py-4 bg-gradient-to-r from-[#C96F91] to-[#E8A0B8] text-white flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              <i class="fa-solid fa-sparkles text-sm"></i>
            </div>
            <div>
              <h3 class="text-sm font-serif font-bold">SKINORA Beauty Advisor</h3>
              <p class="text-[11px] text-pink-100">Konsultasi Kulit Cerdas Berbasis Formula</p>
            </div>
          </div>
          <button id="assistant-close" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Tutup Asisten">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <!-- Conversation Scrollable Body -->
        <div id="assistant-messages" class="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          <!-- Initial Welcome Message -->
          <div class="flex items-start gap-2.5">
            <div class="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-950 text-[#C96F91] flex items-center justify-center shrink-0 text-xs">
              <i class="fa-solid fa-sparkles text-[10px]"></i>
            </div>
            <div class="bg-pink-50 dark:bg-pink-950/40 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm p-3.5 leading-relaxed max-w-[85%] border border-pink-100/60 dark:border-pink-900/30">
              Halo! Saya adalah konsultan kecantikan digital SKINORA. Mari temukan formula perawatan terbaik yang sesuai dengan kondisi kulit dan anggaran Anda.
            </div>
          </div>

          <!-- Dynamic Consultation Container -->
          <div id="assistant-interactive-step"></div>
        </div>

        <!-- Natural Language Free-Text Input Footer -->
        <div class="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#161317] shrink-0">
          <form id="assistant-chat-form" class="flex items-center gap-2">
            <input 
              type="text" 
              id="assistant-query-input" 
              placeholder="Tanya rekomendasi (misal: serum jerawat)..." 
              class="flex-1 py-2 px-3.5 bg-white dark:bg-[#1E1A1E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs focus:outline-none focus:border-[#C96F91] dark:text-gray-200"
            />
            <button type="submit" class="p-2 bg-[#C96F91] hover:bg-[#B55A7E] text-white rounded-xl transition-colors" aria-label="Kirim pertanyaan">
              <i class="fa-solid fa-arrow-up text-xs"></i>
            </button>
          </form>
          <div class="flex justify-between items-center mt-2 px-1 text-[10px] text-gray-400">
            <span>Formula terverifikasi katalog</span>
            <button id="assistant-reset" class="hover:text-[#C96F91] transition-colors underline">Ulangi Tes</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
    this.renderStep();
  },

  bindEvents() {
    const trigger = document.getElementById('assistant-trigger');
    const drawer = document.getElementById('assistant-drawer');
    const closeBtn = document.getElementById('assistant-close');
    const chatForm = document.getElementById('assistant-chat-form');
    const resetBtn = document.getElementById('assistant-reset');

    trigger.addEventListener('click', () => this.toggle());
    closeBtn.addEventListener('click', () => this.toggle(false));

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('assistant-query-input');
      const q = input.value.trim();
      if (!q) return;

      this.handleUserTextQuery(q);
      input.value = '';
    });

    resetBtn.addEventListener('click', () => {
      this.state.step = 1;
      this.state.skinType = null;
      this.state.category = null;
      this.state.budget = null;
      this.renderStep();
    });
  },

  toggle(force) {
    const drawer = document.getElementById('assistant-drawer');
    this.state.isOpen = force !== undefined ? force : !this.state.isOpen;

    if (this.state.isOpen) {
      drawer.classList.remove('translate-y-6', 'opacity-0', 'pointer-events-none');
      drawer.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    } else {
      drawer.classList.add('translate-y-6', 'opacity-0', 'pointer-events-none');
      drawer.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }
  },

  renderStep() {
    const container = document.getElementById('assistant-interactive-step');
    if (!container) return;

    if (this.state.step === 1) {
      container.innerHTML = `
        <div class="bg-white dark:bg-[#1E1A1E] p-3 rounded-2xl border border-pink-100 dark:border-pink-900/30">
          <p class="font-bold text-gray-800 dark:text-gray-200 mb-2">Langkah 1: Apa jenis kulit Anda?</p>
          <div class="grid grid-cols-1 gap-1.5">
            <button onclick="Assistant.selectSkinType('Berminyak')" class="text-left p-2 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors">
              <span class="font-semibold text-pink-700 dark:text-pink-300">Berminyak</span>
              <p class="text-[10px] text-gray-500">Pori-pori besar, kilap berlebih di area T-zone</p>
            </button>
            <button onclick="Assistant.selectSkinType('Kering')" class="text-left p-2 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors">
              <span class="font-semibold text-pink-700 dark:text-pink-300">Kering</span>
              <p class="text-[10px] text-gray-500">Terasa kencang atau bersisik, butuh hidrasi intens</p>
            </button>
            <button onclick="Assistant.selectSkinType('Kombinasi')" class="text-left p-2 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors">
              <span class="font-semibold text-pink-700 dark:text-pink-300">Kombinasi</span>
              <p class="text-[10px] text-gray-500">Berminyak di T-Zone, normal/kering di pipi</p>
            </button>
            <button onclick="Assistant.selectSkinType('Sensitif')" class="text-left p-2 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors">
              <span class="font-semibold text-pink-700 dark:text-pink-300">Sensitif</span>
              <p class="text-[10px] text-gray-500">Mudah kemerahan, perih saat mencoba produk baru</p>
            </button>
            <button onclick="Assistant.selectSkinType('Berjerawat')" class="text-left p-2 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors">
              <span class="font-semibold text-pink-700 dark:text-pink-300">Berjerawat</span>
              <p class="text-[10px] text-gray-500">Rentan bruntusan, jerawat aktif, pori tersumbat</p>
            </button>
          </div>
        </div>
      `;
    } else if (this.state.step === 2) {
      container.innerHTML = `
        <div class="bg-white dark:bg-[#1E1A1E] p-3 rounded-2xl border border-pink-100 dark:border-pink-900/30">
          <div class="flex items-center justify-between mb-2">
            <p class="font-bold text-gray-800 dark:text-gray-200">Langkah 2: Kategori Produk</p>
            <span class="text-[10px] px-2 py-0.5 rounded bg-pink-100 text-pink-700 font-semibold">${this.state.skinType}</span>
          </div>
          <div class="grid grid-cols-2 gap-1.5">
            <button onclick="Assistant.selectCategory('Cleanser')" class="p-2 rounded-lg border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left font-medium">💧 Cleanser</button>
            <button onclick="Assistant.selectCategory('Toner')" class="p-2 rounded-lg border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left font-medium">✨ Toner</button>
            <button onclick="Assistant.selectCategory('Serum')" class="p-2 rounded-lg border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left font-medium">🧪 Serum</button>
            <button onclick="Assistant.selectCategory('Moisturizer')" class="p-2 rounded-lg border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left font-medium">🧴 Moisturizer</button>
            <button onclick="Assistant.selectCategory('Sunscreen')" class="p-2 rounded-lg border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left font-medium">☀️ Sunscreen</button>
            <button onclick="Assistant.selectCategory('Masker')" class="p-2 rounded-lg border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left font-medium">🌸 Masker</button>
            <button onclick="Assistant.selectCategory('Makeup')" class="p-2 rounded-lg border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left font-medium">💄 Makeup</button>
            <button onclick="Assistant.selectCategory('all')" class="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-semibold text-left">⭐ Rekomendasi Rutin</button>
          </div>
        </div>
      `;
    } else if (this.state.step === 3) {
      container.innerHTML = `
        <div class="bg-white dark:bg-[#1E1A1E] p-3 rounded-2xl border border-pink-100 dark:border-pink-900/30">
          <p class="font-bold text-gray-800 dark:text-gray-200 mb-2">Langkah 3: Preferensi Anggaran</p>
          <div class="grid grid-cols-1 gap-1.5">
            <button onclick="Assistant.selectBudget(150000)" class="p-2.5 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left">
              <span class="font-semibold text-gray-800 dark:text-gray-200">Di bawah Rp 150.000</span>
              <p class="text-[10px] text-gray-500">Formula esensial terjangkau &amp; berkualitas</p>
            </button>
            <button onclick="Assistant.selectBudget(200000)" class="p-2.5 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left">
              <span class="font-semibold text-gray-800 dark:text-gray-200">Rp 150.000 - Rp 200.000</span>
              <p class="text-[10px] text-gray-500">Perawatan terarah dengan bahan aktif optimal</p>
            </button>
            <button onclick="Assistant.selectBudget(999999)" class="p-2.5 rounded-xl border border-pink-100 dark:border-gray-800 hover:bg-pink-50 text-left">
              <span class="font-semibold text-gray-800 dark:text-gray-200">Bebas Anggaran (Semua Pilihan)</span>
              <p class="text-[10px] text-gray-500">Tampilkan formulasi terbaik tanpa batasan harga</p>
            </button>
          </div>
        </div>
      `;
    } else if (this.state.step === 4) {
      this.displayRecommendations();
    }
  },

  selectSkinType(type) {
    this.state.skinType = type;
    this.state.step = 2;
    this.renderStep();
  },

  selectCategory(cat) {
    this.state.category = cat;
    this.state.step = 3;
    this.renderStep();
  },

  selectBudget(budget) {
    this.state.budget = budget;
    this.state.step = 4;
    this.renderStep();
  },

  displayRecommendations() {
    const container = document.getElementById('assistant-interactive-step');
    if (!container) return;

    const all = Products.getAll();
    let matches = all.filter(p => p.skinType.toLowerCase() === this.state.skinType.toLowerCase());

    if (this.state.category && this.state.category !== 'all') {
      matches = matches.filter(p => p.category.toLowerCase() === this.state.category.toLowerCase());
    }

    if (this.state.budget && this.state.budget < 900000) {
      matches = matches.filter(p => p.price <= this.state.budget);
    }

    // Fallback if strict budget filtered out everything
    if (matches.length === 0) {
      matches = all.filter(p => p.skinType.toLowerCase() === this.state.skinType.toLowerCase()).slice(0, 3);
    }

    container.innerHTML = `
      <div class="space-y-3">
        <div class="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-2xl border border-pink-100 dark:border-pink-900/40">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-gray-800 dark:text-gray-200">Hasil Rekomendasi Terpilih</span>
            <span class="text-[10px] font-semibold text-pink-700 dark:text-pink-300">${matches.length} Produk Ditemukan</span>
          </div>
          <p class="text-[11px] text-gray-600 dark:text-gray-400">
            Disesuaikan untuk kulit <strong>${this.state.skinType}</strong> ${this.state.category !== 'all' ? `kategori <strong>${this.state.category}</strong>` : ''}.
          </p>
        </div>

        <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
          ${matches.map(product => `
            <div class="p-2.5 bg-white dark:bg-[#1E1A1E] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-3 items-center">
              <img src="${product.image}" alt="${product.name}" class="w-14 h-14 object-contain rounded-lg bg-pink-50/50 shrink-0 border border-pink-100/40" onerror="this.src='assets/images/banners/hero-banner.jpg'" />
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-semibold text-[#C96F91] uppercase tracking-wider">${product.brand}</span>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100 text-xs truncate">${product.name}</h4>
                <div class="flex items-center justify-between mt-1">
                  <span class="font-bold text-gray-800 dark:text-gray-200 tabular-nums">Rp ${product.price.toLocaleString('id-ID')}</span>
                  <div class="flex items-center gap-1">
                    <a href="product.html?id=${product.id}" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded text-[10px] font-medium transition-colors">Detail</a>
                    <button onclick="Cart.buyNow(Products.getById('${product.id}'), 1)" class="px-2.5 py-1 bg-[#C96F91] hover:bg-[#B55A7E] text-white rounded text-[10px] font-semibold transition-colors">
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  handleUserTextQuery(query) {
    const messages = document.getElementById('assistant-messages');
    if (!messages) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'flex justify-end';
    userMsg.innerHTML = `
      <div class="bg-[#C96F91] text-white rounded-2xl rounded-tr-sm p-3 max-w-[85%] leading-relaxed">
        ${query}
      </div>
    `;
    messages.appendChild(userMsg);

    // Analyze intent
    const q = query.toLowerCase();
    const all = Products.getAll();

    let matchedSkin = null;
    ['berminyak', 'kering', 'kombinasi', 'sensitif', 'berjerawat'].forEach(skin => {
      if (q.includes(skin)) matchedSkin = skin;
    });

    let matchedCat = null;
    ['cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen', 'masker', 'makeup'].forEach(cat => {
      if (q.includes(cat)) matchedCat = cat;
    });

    let results = all;
    if (matchedSkin) {
      results = results.filter(p => p.skinType.toLowerCase() === matchedSkin);
    }
    if (matchedCat) {
      results = results.filter(p => p.category.toLowerCase() === matchedCat);
    }

    if (!matchedSkin && !matchedCat) {
      // General keyword search
      results = all.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    if (results.length === 0) {
      results = Products.getFeatured().slice(0, 3);
    }

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'flex items-start gap-2.5';
      botMsg.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-950 text-[#C96F91] flex items-center justify-center shrink-0 text-xs">
          <i class="fa-solid fa-sparkles text-[10px]"></i>
        </div>
        <div class="bg-pink-50 dark:bg-pink-950/40 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm p-3.5 leading-relaxed max-w-[85%] border border-pink-100/60 dark:border-pink-900/30">
          <p class="mb-2">Berdasarkan pertanyaan Anda, berikut adalah produk yang sangat direkomendasikan:</p>
          <div class="space-y-2 mt-2">
            ${results.slice(0, 3).map(p => `
              <div class="p-2 bg-white dark:bg-[#1E1A1E] rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                <div class="min-w-0">
                  <p class="font-semibold text-xs truncate">${p.name}</p>
                  <p class="text-[10px] text-[#C96F91]">Rp ${p.price.toLocaleString('id-ID')} · ${p.skinType}</p>
                </div>
                <button onclick="Cart.buyNow(Products.getById('${p.id}'), 1)" class="px-2 py-1 bg-[#C96F91] text-white rounded text-[10px] shrink-0 font-medium">
                  Beli
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 400);

    messages.scrollTop = messages.scrollHeight;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Assistant.init();
});

if (typeof window !== 'undefined') {
  window.Assistant = Assistant;
}
