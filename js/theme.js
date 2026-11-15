/**
 * Tema SKINORA: hanya mode terang.
 * Mode gelap sudah dihapus. File ini memastikan sisa pengaturan lama
 * ('skinora_theme' = 'dark') tidak mengaktifkan kelas .dark.
 */
document.documentElement.classList.remove('dark');
try { localStorage.setItem('skinora_theme', 'light'); } catch (e) { /* abaikan */ }
