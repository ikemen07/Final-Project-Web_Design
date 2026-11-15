/**
 * CSV Export Module for SKINORA Admin Dashboard
 * Generates RFC 4180 compliant CSV files with UTF-8 BOM for Microsoft Excel compatibility.
 */

const CSVExport = {
  /**
   * Export all products to CSV
   */
  exportProducts() {
    const products = Products.getAll();
    if (!products || products.length === 0) {
      Notifications.toast('Tidak ada data produk untuk diekspor.', 'warning');
      return;
    }

    const headers = [
      { key: 'id', label: 'ID Produk' },
      { key: 'name', label: 'Nama Produk' },
      { key: 'brand', label: 'Brand' },
      { key: 'category', label: 'Kategori' },
      { key: 'skinType', label: 'Jenis Kulit' },
      { key: 'price', label: 'Harga (IDR)' },
      { key: 'stock', label: 'Stok' },
      { key: 'rating', label: 'Rating' },
      { key: 'featured', label: 'Unggulan (Featured)' },
      { key: 'description', label: 'Deskripsi' }
    ];

    const rows = products.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      skinType: p.skinType,
      price: p.price,
      stock: p.stock,
      rating: p.rating,
      featured: p.featured ? 'Ya' : 'Tidak',
      description: p.description
    }));

    const csvContent = this._buildCSV(headers, rows);
    this._downloadFile(csvContent, `SKINORA_Products_${this._getDateStamp()}.csv`);
    Notifications.toast('Data produk berhasil diekspor ke CSV.', 'success');
  },

  /**
   * Export all orders to CSV
   */
  exportOrders() {
    const orders = Orders.getAll();
    if (!orders || orders.length === 0) {
      Notifications.toast('Tidak ada data pesanan untuk diekspor.', 'warning');
      return;
    }

    const headers = [
      { key: 'orderId', label: 'Order ID' },
      { key: 'date', label: 'Tanggal Pesanan' },
      { key: 'customerName', label: 'Nama Pelanggan' },
      { key: 'customerEmail', label: 'Email' },
      { key: 'customerPhone', label: 'No. Telepon' },
      { key: 'deliveryAddress', label: 'Alamat Pengiriman' },
      { key: 'city', label: 'Kota' },
      { key: 'postalCode', label: 'Kode Pos' },
      { key: 'itemsSummary', label: 'Ringkasan Item' },
      { key: 'subtotal', label: 'Subtotal (IDR)' },
      { key: 'shipping', label: 'Ongkos Kirim (IDR)' },
      { key: 'total', label: 'Total (IDR)' },
      { key: 'paymentMethod', label: 'Metode Pembayaran' },
      { key: 'status', label: 'Status' }
    ];

    const rows = orders.map(o => ({
      orderId: o.orderId,
      date: new Date(o.date).toLocaleString('id-ID'),
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      customerPhone: o.customerPhone,
      deliveryAddress: o.deliveryAddress,
      city: o.city,
      postalCode: o.postalCode,
      itemsSummary: o.items.map(i => `${i.name} (x${i.quantity})`).join('; '),
      subtotal: o.subtotal,
      shipping: o.shipping,
      total: o.total,
      paymentMethod: o.paymentMethod,
      status: o.status
    }));

    const csvContent = this._buildCSV(headers, rows);
    this._downloadFile(csvContent, `SKINORA_Orders_${this._getDateStamp()}.csv`);
    Notifications.toast('Data pesanan berhasil diekspor ke CSV.', 'success');
  },

  _buildCSV(headers, rows) {
    const escapeCell = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const headerLine = headers.map(h => escapeCell(h.label)).join(',');
    const dataLines = rows.map(row => headers.map(h => escapeCell(row[h.key])).join(','));

    // Prepend UTF-8 BOM (\uFEFF)
    return '\uFEFF' + [headerLine, ...dataLines].join('\r\n');
  },

  _downloadFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  _getDateStamp() {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  }
};

if (typeof window !== 'undefined') {
  window.CSVExport = CSVExport;
}
