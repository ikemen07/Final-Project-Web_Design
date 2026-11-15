/**
 * Notification and Confirmation Dialog System for SKINORA
 * Uses SweetAlert2 with graceful, styled luxury fallbacks.
 */

const Notifications = {
  /**
   * Quick corner toast notification
   */
  toast(message, type = 'success') {
    if (typeof Swal !== 'undefined') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: document.documentElement.classList.contains('dark') ? '#1E1A1E' : '#FFFFFF',
        color: document.documentElement.classList.contains('dark') ? '#F7EDF2' : '#292329',
        iconColor: type === 'success' ? '#C96F91' : type === 'error' ? '#E11D48' : '#F59E0B',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: type,
        title: message
      });
    } else {
      // Fallback custom toast element
      this._nativeToast(message, type);
    }
  },

  /**
   * Modal dialog for important alerts (login, checkout success)
   */
  modal(title, html, icon = 'info', confirmButtonText = 'OK') {
    if (typeof Swal !== 'undefined') {
      return Swal.fire({
        title,
        html,
        icon,
        confirmButtonText,
        confirmButtonColor: '#C96F91',
        background: document.documentElement.classList.contains('dark') ? '#1E1A1E' : '#FFFFFF',
        color: document.documentElement.classList.contains('dark') ? '#F7EDF2' : '#292329'
      });
    } else {
      window.alert(`${title}\n\n${html.replace(/<[^>]*>?/gm, '')}`);
      return Promise.resolve({ isConfirmed: true });
    }
  },

  /**
   * Confirmation dialog before destructive actions (delete product, delete category, clear cart)
   */
  async confirm(title, text, confirmButtonText = 'Ya, Lanjutkan', cancelButtonText = 'Batal') {
    if (typeof Swal !== 'undefined') {
      const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C96F91',
        cancelButtonColor: '#8A7D84',
        confirmButtonText,
        cancelButtonText,
        background: document.documentElement.classList.contains('dark') ? '#1E1A1E' : '#FFFFFF',
        color: document.documentElement.classList.contains('dark') ? '#F7EDF2' : '#292329'
      });
      return result.isConfirmed;
    } else {
      return window.confirm(`${title}\n\n${text}`);
    }
  },

  _nativeToast(msg, type) {
    let container = document.getElementById('skinora-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'skinora-toast-container';
      container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      padding: 12px 20px;
      border-radius: 12px;
      background: ${type === 'error' ? '#BE123C' : '#C96F91'};
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(201, 111, 145, 0.25);
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.25s ease;
      pointer-events: auto;
    `;
    toast.textContent = msg;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }
};

if (typeof window !== 'undefined') {
  window.Notifications = Notifications;
}
