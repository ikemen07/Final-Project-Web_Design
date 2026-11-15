/**
 * Chart.js Integration for SKINORA Admin Dashboard
 * Visualizes sales revenue, order status breakdown, and category product counts.
 */

const DashboardCharts = {
  salesChartInstance: null,
  statusChartInstance: null,
  categoryChartInstance: null,

  init() {
    if (typeof Chart === 'undefined') {
      console.warn('[DashboardCharts] Chart.js is not loaded yet.');
      return;
    }

    this.renderSalesChart();
    this.renderStatusChart();
    this.renderCategoryChart();

    // Re-render when theme changes to adapt label colors
    window.addEventListener('skinora:theme_changed', () => {
      this.destroyAll();
      this.init();
    });

    // Re-render when storage changes
    window.addEventListener('skinora:storage_updated', (e) => {
      if (e.detail && (e.detail.key === STORAGE_KEYS.ORDERS || e.detail.key === STORAGE_KEYS.PRODUCTS)) {
        this.destroyAll();
        this.init();
      }
    });
  },

  destroyAll() {
    if (this.salesChartInstance) this.salesChartInstance.destroy();
    if (this.statusChartInstance) this.statusChartInstance.destroy();
    if (this.categoryChartInstance) this.categoryChartInstance.destroy();
  },

  isDark() {
    return document.documentElement.classList.contains('dark');
  },

  getTextColor() {
    return this.isDark() ? '#D1C2CA' : '#5A4E55';
  },

  getGridColor() {
    return this.isDark() ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  },

  /**
   * 1. Sales Overview Chart (Revenue Timeline)
   */
  renderSalesChart() {
    const canvas = document.getElementById('salesOverviewChart');
    if (!canvas) return;

    const orders = Orders.getAll();
    const months = ['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthlyRevenue = [1850000, 2400000, 3100000, 2900000, 0, 0];

    // Add current live orders to current month (Nov 2026)
    const currentMonthRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    monthlyRevenue[4] = 3450000 + currentMonthRevenue;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(201, 111, 145, 0.4)');
    gradient.addColorStop(1, 'rgba(201, 111, 145, 0.0)');

    this.salesChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Pendapatan (IDR)',
          data: monthlyRevenue,
          borderColor: '#C96F91',
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#C96F91',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `Rp ${context.raw.toLocaleString('id-ID')}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: this.getTextColor(), font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            grid: { color: this.getGridColor() },
            ticks: {
              color: this.getTextColor(),
              font: { family: 'Plus Jakarta Sans', size: 11 },
              callback: (value) => `Rp ${(value / 1000000).toFixed(1)}Jt`
            }
          }
        }
      }
    });
  },

  /**
   * 2. Order Statistics (Status Breakdown)
   */
  renderStatusChart() {
    const canvas = document.getElementById('orderStatusChart');
    if (!canvas) return;

    const orders = Orders.getAll();
    const statuses = ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'];
    const counts = statuses.map(st => orders.filter(o => o.status === st).length);

    // Provide baseline visual data if orders are few
    if (orders.length === 0) {
      counts[0] = 1;
      counts[3] = 2;
    }

    const ctx = canvas.getContext('2d');
    this.statusChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: statuses,
        datasets: [{
          data: counts,
          backgroundColor: [
            '#F59E0B', // Pending - Amber
            '#3B82F6', // Processing - Blue
            '#8B5CF6', // Shipped - Purple
            '#10B981', // Completed - Emerald
            '#EF4444'  // Cancelled - Rose
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: this.getTextColor(),
              font: { family: 'Plus Jakarta Sans', size: 11 },
              padding: 12,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        },
        cutout: '72%'
      }
    });
  },

  /**
   * 3. Product Category Distribution
   */
  renderCategoryChart() {
    const canvas = document.getElementById('categoryDistributionChart');
    if (!canvas) return;

    const categories = Products.getCategories();
    const products = Products.getAll();

    const labels = categories.map(c => c.name);
    const data = categories.map(c => products.filter(p => p.category.toLowerCase() === c.name.toLowerCase()).length);

    const ctx = canvas.getContext('2d');
    this.categoryChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Jumlah Produk',
          data,
          backgroundColor: '#E8A0B8',
          hoverBackgroundColor: '#C96F91',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: this.getTextColor(), font: { family: 'Plus Jakarta Sans', size: 10 } }
          },
          y: {
            grid: { color: this.getGridColor() },
            ticks: {
              color: this.getTextColor(),
              font: { family: 'Plus Jakarta Sans', size: 11 },
              stepSize: 1
            }
          }
        }
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.DashboardCharts = DashboardCharts;
}
