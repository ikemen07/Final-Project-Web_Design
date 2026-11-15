/**
 * Client-Side Form Validation Module for SKINORA
 * Provides pure validation rules and DOM feedback rendering.
 */

const Validation = {
  /**
   * Check if value is not empty
   */
  isRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  },

  /**
   * Validate email format with standard RFC 5322 regex
   */
  isEmail(email) {
    if (!email) return false;
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(String(email).trim());
  },

  /**
   * Validate Indonesian / International phone number format
   * (e.g. 08123456789 or +628123456789)
   */
  isPhoneNumber(phone) {
    if (!phone) return false;
    const clean = String(phone).replace(/[\s-]/g, '');
    return /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/.test(clean);
  },

  /**
   * Validate password minimum length
   */
  isMinLength(value, min = 6) {
    if (!value) return false;
    return String(value).length >= min;
  },

  /**
   * Validate positive number (e.g. Price > 0)
   */
  isPositiveNumber(value) {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },

  /**
   * Validate non-negative integer (e.g. Stock >= 0)
   */
  isNonNegativeInteger(value) {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && Number.isInteger(num);
  },

  /**
   * Validate postal code (5 digits for Indonesia)
   */
  isPostalCode(postalCode) {
    if (!postalCode) return false;
    return /^[0-9]{5}$/.test(String(postalCode).trim());
  },

  /**
   * Highlight field with error message in the DOM
   */
  showError(inputElement, message) {
    if (!inputElement) return;
    inputElement.classList.add('border-rose-500', 'focus:ring-rose-400');
    inputElement.classList.remove('border-emerald-500');

    // Look for error container or create one
    let errorContainer = inputElement.parentElement.querySelector('.validation-error-msg');
    if (!errorContainer) {
      errorContainer = document.createElement('p');
      errorContainer.className = 'validation-error-msg text-xs text-rose-500 mt-1 font-medium';
      inputElement.parentElement.appendChild(errorContainer);
    }
    errorContainer.textContent = message;
  },

  /**
   * Clear error state from input element
   */
  clearError(inputElement) {
    if (!inputElement) return;
    inputElement.classList.remove('border-rose-500', 'focus:ring-rose-400');

    const errorContainer = inputElement.parentElement.querySelector('.validation-error-msg');
    if (errorContainer) {
      errorContainer.remove();
    }
  },

  /**
   * Validate customer checkout form
   */
  validateCheckout(formData) {
    const errors = {};

    if (!this.isRequired(formData.name)) {
      errors.name = 'Nama lengkap wajib diisi.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Nama lengkap minimal 3 karakter.';
    }

    if (!this.isRequired(formData.email)) {
      errors.email = 'Alamat email wajib diisi.';
    } else if (!this.isEmail(formData.email)) {
      errors.email = 'Format email tidak valid (contoh: user@domain.com).';
    }

    if (!this.isRequired(formData.phone)) {
      errors.phone = 'Nomor telepon/WhatsApp wajib diisi.';
    } else if (!this.isPhoneNumber(formData.phone)) {
      errors.phone = 'Nomor telepon tidak valid (contoh: 08123456789).';
    }

    if (!this.isRequired(formData.address)) {
      errors.address = 'Alamat pengiriman lengkap wajib diisi.';
    } else if (formData.address.trim().length < 10) {
      errors.address = 'Harap masukkan alamat lebih detail (minimal 10 karakter).';
    }

    if (!this.isRequired(formData.city)) {
      errors.city = 'Kota tujuan wajib diisi.';
    }

    if (!this.isRequired(formData.postalCode)) {
      errors.postalCode = 'Kode pos wajib diisi.';
    } else if (!this.isPostalCode(formData.postalCode)) {
      errors.postalCode = 'Kode pos harus 5 digit angka.';
    }

    if (!this.isRequired(formData.paymentMethod)) {
      errors.paymentMethod = 'Pilih salah satu metode pembayaran.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  /**
   * Validate Product Form (CRUD Create/Update)
   */
  validateProduct(formData) {
    const errors = {};

    if (!this.isRequired(formData.name)) {
      errors.name = 'Nama produk wajib diisi.';
    }

    if (!this.isRequired(formData.brand)) {
      errors.brand = 'Nama brand wajib diisi.';
    }

    if (!this.isRequired(formData.category)) {
      errors.category = 'Kategori wajib dipilih.';
    }

    if (!this.isRequired(formData.skinType)) {
      errors.skinType = 'Jenis kulit sasaran wajib dipilih.';
    }

    if (!this.isRequired(formData.price)) {
      errors.price = 'Harga produk wajib diisi.';
    } else if (!this.isPositiveNumber(formData.price)) {
      errors.price = 'Harga harus berupa angka positif (lebih besar dari 0).';
    }

    if (formData.stock === '' || formData.stock === null || formData.stock === undefined) {
      errors.stock = 'Jumlah stok wajib diisi.';
    } else if (!this.isNonNegativeInteger(formData.stock)) {
      errors.stock = 'Stok harus berupa bilangan bulat tidak negatif (>= 0).';
    }

    if (!this.isRequired(formData.description)) {
      errors.description = 'Deskripsi produk wajib diisi.';
    } else if (formData.description.trim().length < 15) {
      errors.description = 'Deskripsi minimal 15 karakter untuk informasi yang memadai.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

if (typeof window !== 'undefined') {
  window.Validation = Validation;
}
