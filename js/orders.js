/**
 * Orders Management Module for SKINORA
 * Handles order creation, status progression, and admin dashboard statistical aggregation.
 */

const Orders = {
  /**
   * Retrieve all orders
   */
  getAll() {
    return Storage.get(STORAGE_KEYS.ORDERS, []);
  },

  /**
   * Get single order by ID
   */
  getById(orderId) {
    if (!orderId) return null;
    return this.getAll().find(o => o.orderId === orderId) || null;
  },

  /**
   * Get orders for a specific customer
   */
  getByCustomer(email) {
    if (!email) return [];
    return this.getAll().filter(o => o.customerEmail.toLowerCase() === email.toLowerCase());
  },

  /**
   * CREATE: Place a new order
   */
  create(orderInput) {
    const orders = this.getAll();
    const date = new Date();
    const yyyymm = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderId = `SKN-${yyyymm}-${rand}`;

    const newOrder = {
      orderId,
      customerId: orderInput.customerId || `GUEST-${Date.now()}`,
      customerName: orderInput.customerName.trim(),
      customerEmail: orderInput.customerEmail.trim().toLowerCase(),
      customerPhone: orderInput.customerPhone.trim(),
      deliveryAddress: orderInput.deliveryAddress.trim(),
      city: orderInput.city.trim(),
      postalCode: orderInput.postalCode.trim(),
      paymentMethod: orderInput.paymentMethod,
      status: 'Pending',
      date: date.toISOString(),
      items: orderInput.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      subtotal: orderInput.subtotal,
      shipping: orderInput.shipping,
      total: orderInput.total
    };

    orders.unshift(newOrder);
    Storage.set(STORAGE_KEYS.ORDERS, orders);

    // Deduct inventory stock
    Products.deductStock(newOrder.items);

    // Clear cart
    Cart.clear();

    return {
      success: true,
      order: newOrder,
      message: `Pesanan #${orderId} berhasil dibuat!`
    };
  },

  /**
   * UPDATE: Change order status
   */
  updateStatus(orderId, newStatus) {
    const orders = this.getAll();
    const index = orders.findIndex(o => o.orderId === orderId);

    if (index === -1) {
      return { success: false, message: 'Pesanan tidak ditemukan.' };
    }

    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return { success: false, message: 'Status pesanan tidak valid.' };
    }

    orders[index].status = newStatus;
    Storage.set(STORAGE_KEYS.ORDERS, orders);

    Notifications.toast(`Status pesanan #${orderId} diubah menjadi ${newStatus}.`, 'success');
    return { success: true, order: orders[index] };
  },

  /**
   * UPDATE/DELETE: Pelanggan membatalkan pesanan (hanya saat masih Pending), stok dikembalikan
   */
  cancel(orderId) {
    const order = this.getById(orderId);
    if (!order) return { success: false, message: 'Pesanan tidak ditemukan.' };
    if (order.status !== 'Pending') {
      return { success: false, message: 'Pesanan yang sudah diproses tidak dapat dibatalkan.' };
    }
    const res = this.updateStatus(orderId, 'Cancelled');
    if (res.success) {
      const products = Products.getAll();
      order.items.forEach(item => {
        const p = products.find(prod => prod.id === item.id);
        if (p) p.stock += item.quantity;
      });
      Storage.set(STORAGE_KEYS.PRODUCTS, products);
    }
    return res;
  },

  /**
   * Aggregate statistics for the Admin Dashboard
   */
  getDashboardStats() {
    const orders = this.getAll();
    const products = Products.getAll();
    const categories = Products.getCategories();
    const users = Storage.get(STORAGE_KEYS.USERS, []);

    // Total revenue from non-cancelled orders
    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    // Count unique customers
    const uniqueEmails = new Set(orders.map(o => o.customerEmail));
    users.filter(u => u.role === 'customer').forEach(u => uniqueEmails.add(u.email));

    // Low stock items (stock <= 5)
    const lowStockProducts = products.filter(p => p.stock <= 5);

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalOrders: orders.length,
      totalRevenue,
      totalCustomers: uniqueEmails.size,
      lowStockCount: lowStockProducts.length,
      lowStockProducts
    };
  }
};

if (typeof window !== 'undefined') {
  window.Orders = Orders;
}
