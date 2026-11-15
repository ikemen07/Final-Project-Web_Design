/**
 * Theme Manager for SKINORA (Light / Dark Mode)
 * Syncs with Local Storage key 'skinora_theme' and toggles .dark class on <html>.
 */

const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem('skinora_theme') || 'light';
    this.applyTheme(savedTheme);

    // Bind all theme toggler buttons in DOM
    const togglers = document.querySelectorAll('.theme-toggle-btn');
    togglers.forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('skinora_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('skinora_theme', 'light');
    }

    // Update icons on toggle buttons
    const togglers = document.querySelectorAll('.theme-toggle-btn');
    togglers.forEach(btn => {
      const sunIcon = btn.querySelector('.theme-sun-icon');
      const moonIcon = btn.querySelector('.theme-moon-icon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    });

    window.dispatchEvent(new CustomEvent('skinora:theme_changed', { detail: { theme } }));
  },

  toggle() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  },

  isDark() {
    return document.documentElement.classList.contains('dark');
  }
};

// Immediate execution before DOM render to prevent theme flashing
(function() {
  const saved = localStorage.getItem('skinora_theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});

if (typeof window !== 'undefined') {
  window.ThemeManager = ThemeManager;
}
