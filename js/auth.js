/**
 * Authentication & Role Management for SKINORA
 * Simulated client-side session using Local Storage ('skinora_session' & 'skinora_users').
 * Admin Demo Credentials: admin@skinora.com / admin123
 */

const Auth = {
  /**
   * Get currently active session user
   */
  getCurrentUser() {
    return Storage.get(STORAGE_KEYS.SESSION, null);
  },

  /**
   * Check if current user is logged in
   */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  /**
   * Check if current user is Admin
   */
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  },

  /**
   * Login user by matching email and password against stored users
   */
  login(email, password) {
    const users = Storage.get(STORAGE_KEYS.USERS, []);
    const cleanEmail = String(email).trim().toLowerCase();

    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);
    if (!user) {
      return {
        success: false,
        message: 'Email atau kata sandi tidak cocok. Silakan periksa kembali.'
      };
    }

    // Save session without storing raw password in session object
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      address: user.address || '',
      city: user.city || '',
      postalCode: user.postalCode || '',
      loggedInAt: new Date().toISOString()
    };

    Storage.set(STORAGE_KEYS.SESSION, sessionUser);
    window.dispatchEvent(new CustomEvent('skinora:auth_changed', { detail: { user: sessionUser } }));

    return {
      success: true,
      user: sessionUser,
      message: `Selamat datang kembali, ${sessionUser.name}!`
    };
  },

  /**
   * Register a new customer
   */
  register(userData) {
    const users = Storage.get(STORAGE_KEYS.USERS, []);
    const cleanEmail = String(userData.email).trim().toLowerCase();

    // Check if email already registered
    const exists = users.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return {
        success: false,
        message: 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.'
      };
    }

    const newUser = {
      id: `USR-${Date.now().toString(36).toUpperCase()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      password: userData.password,
      phone: userData.phone ? userData.phone.trim() : '',
      role: 'customer',
      address: userData.address || '',
      city: userData.city || '',
      postalCode: userData.postalCode || '',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    Storage.set(STORAGE_KEYS.USERS, users);

    // Auto login new registered user
    return this.login(cleanEmail, userData.password);
  },

  /**
   * Log out current user
   */
  logout() {
    Storage.remove(STORAGE_KEYS.SESSION);
    window.dispatchEvent(new CustomEvent('skinora:auth_changed', { detail: { user: null } }));
    Notifications.toast('Anda telah berhasil keluar (Logout).', 'info');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 600);
  },

  /**
   * Route guard for Admin pages (dashboard.html)
   */
  guardAdmin() {
    if (!this.isAdmin()) {
      const user = this.getCurrentUser();
      const container = document.getElementById('admin-content') || document.body;
      const deniedHtml = `
        <div class="min-h-[70vh] flex items-center justify-center p-6">
          <div class="max-w-md w-full bg-white dark:bg-[#1E1A1E] rounded-2xl p-8 border border-rose-200 dark:border-rose-900/30 text-center shadow-xl">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 text-2xl">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h2 class="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2">Akses Terbatas</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Halaman Admin Dashboard hanya dapat diakses oleh akun Administrator.
              ${user ? `Saat ini Anda login sebagai <strong>${user.name} (Customer)</strong>.` : 'Anda belum login.'}
            </p>
            <div class="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-xl mb-6 text-xs text-left text-pink-900 dark:text-pink-300">
              <p class="font-bold mb-1">Gunakan Akun Demo Admin:</p>
              <p>Email: <code class="bg-white/80 dark:bg-black/30 px-1 py-0.5 rounded">admin@skinora.com</code></p>
              <p>Password: <code class="bg-white/80 dark:bg-black/30 px-1 py-0.5 rounded">admin123</code></p>
            </div>
            <div class="flex flex-col gap-2">
              <a href="login.html?redirect=dashboard.html" class="w-full py-2.5 px-4 bg-[#C96F91] hover:bg-[#B55A7E] text-white rounded-xl text-sm font-semibold transition-colors">
                Login Sebagai Admin
              </a>
              <a href="index.html" class="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-colors">
                Kembali ke Beranda
              </a>
            </div>
          </div>
        </div>
      `;
      container.innerHTML = deniedHtml;
      return false;
    }
    return true;
  },

  /**
   * Update top navigation user info dynamically
   */
  renderNavUser() {
    const userContainer = document.getElementById('nav-user-container');
    if (!userContainer) return;

    const user = this.getCurrentUser();
    if (user) {
      // Sudah login: tampilkan nama (tanpa dropdown) + tombol keluar
      const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      const target = user.role === 'admin' ? 'dashboard.html' : 'pesanan.html';
      const title = user.role === 'admin' ? 'Buka Admin Dashboard' : 'Lihat My Order';
      userContainer.innerHTML = `
        <div class="flex items-center gap-1">
          <a href="${target}" title="${title}" class="flex items-center gap-2 py-1.5 pl-1.5 pr-3 rounded-full hover:bg-pink-50 text-sm font-medium transition-colors">
            <span class="w-7 h-7 rounded-full bg-[#E8A0B8] text-white flex items-center justify-center text-xs font-bold uppercase">${esc(user.name.charAt(0))}</span>
            <span class="hidden sm:inline max-w-[120px] truncate text-gray-700">${esc(user.name)}</span>
          </a>
          <button type="button" onclick="Auth.logout()" title="Keluar" aria-label="Keluar" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
            <i class="fa-solid fa-arrow-right-from-bracket text-xs"></i>
          </button>
        </div>
      `;
    } else {
      userContainer.innerHTML = `
        <a href="login.html" class="flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#C96F91] hover:bg-[#B55A7E] text-xs font-semibold text-white transition-colors">
          <i class="fa-regular fa-user"></i>
          <span>Login</span>
        </a>
      `;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Auth.renderNavUser();
});

if (typeof window !== 'undefined') {
  window.Auth = Auth;
}
