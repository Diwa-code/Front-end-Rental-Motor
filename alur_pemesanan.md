# 🛵 Alur Pemesanan Motor (Booking Flow) - Sistem User

Dokumen ini memuat logika dan tahapan lengkap proses penyewaan motor dari sudut pandang pelanggan (User). Sistem ini dirancang untuk memastikan keamanan transaksi, validitas data penyewa, dan mengimplementasikan logika diskon otomatis berdasarkan durasi sewa sebelum pesanan diproses ke *database* (`tb_transaksi`).

---

## 📍 Fase 1: Eksplorasi (Katalog Motor)
Fase ini terjadi di halaman utama (Beranda) aplikasi.
*   **Tampilan (UI):** Menampilkan *grid* atau daftar katalog motor yang tersedia untuk disewa.
*   **Logika Sistem:** Mengambil data dari tabel `tb_motor` dan hanya memunculkan unit dengan status `'tersedia'`.
*   **Aksi Pelanggan:** Pelanggan memilih motor berdasarkan spesifikasi dan harga harian, lalu menekan tombol **"Sewa Motor Ini"**.

## 📍 Fase 2: Gerbang Validasi (Gatekeeper)
Fase kritis yang berjalan di latar belakang (middleware/controller) sebelum pelanggan masuk ke form pemesanan.
1.  **Pengecekan Sesi (Auth):** Jika pelanggan belum *login*, sistem melemparnya ke halaman Login/Register.
2.  **Pengecekan Identitas (`tb_customer`):** Jika sudah *login*, sistem memeriksa profil identitas pelanggan.
    *   *Kondisi Gagal:* Jika `no_telp`, `alamat`, atau `foto_ktp` masih kosong/null, sistem **memblokir** proses pemesanan dan mengarahkan pelanggan secara paksa ke form pengisian identitas.
    *   *Kondisi Lolos:* Jika seluruh data identitas lengkap, pelanggan diizinkan melanjutkan ke Fase 3.

## 📍 Fase 3: Halaman Checkout (Form Pemesanan & Kalkulasi Diskon)
Halaman tempat pelanggan menentukan detail waktu penyewaan.
*   **Input Data:** Pelanggan memasukkan **Tanggal Sewa** (Mulai) dan **Tanggal Kembali** (Selesai).
*   **Kalkulasi Real-time & Sistem Diskon (Frontend):** Sistem (React) secara otomatis menghitung durasi hari sewa. Harga dikalkulasi dengan aturan bisnis berikut:
    *   **Harga Normal:** Durasi harian biasa dikalikan harga per hari.
    *   **Diskon 1 Bulan:** Jika durasi mencapai 1 bulan (30 hari), sistem otomatis memotong total harga sesuai persentase/potongan diskon 1 bulan.
    *   **Diskon 3 Bulan:** Jika durasi mencapai 3 bulan (90 hari), sistem menerapkan potongan diskon 3 bulan.
    *   **Diskon Kelipatan 6 Bulan:** Jika durasi mencapai 6 bulan (180 hari), 12 bulan (360 hari), 18 bulan, dan seterusnya, sistem menerapkan tingkat diskon maksimal (kelipatan 6 bulan).
*   **Aksi Pelanggan:** Mengecek ringkasan harga (beserta coretan harga asli jika diskon berlaku) dan menekan tombol **"Konfirmasi Pesanan"**.

## 📍 Fase 4: Pemrosesan Data (Backend Logic)
Data dikirim ke server (Laravel) untuk divalidasi dan disimpan.
1.  **Validasi Tanggal:** Memastikan *Tanggal Kembali* lebih besar dari *Tanggal Sewa*, dan *Tanggal Sewa* tidak berada di masa lalu.
2.  **Validasi Ulang Harga (Security):** Backend **wajib** menghitung ulang durasi dan diskon (1 bulan, 3 bulan, kelipatan 6 bulan) untuk memastikan `total_harga` yang dikirim dari Frontend tidak dimanipulasi oleh *user*.
3.  **Penyimpanan (`tb_transaksi`):** Sistem mencatat baris transaksi baru dengan rincian:
    *   `customer_id` = ID pelanggan.
    *   `motor_id` = ID motor yang dipilih.
    *   `tanggal_sewa` & `tanggal_kembali` = Sesuai input form.
    *   `total_harga` = Total biaya hasil kalkulasi akhir.
    *   `status_transaksi` = Di-set menjadi **'menunggu_pembayaran'**.
4.  **Kunci Inventaris:** Status pada `tb_motor` diubah menjadi `'dipesan'` agar tidak dapat disewa pelanggan lain.

## 📍 Fase 5: Pasca-Pemesanan (Redirect & Dashboard)
Fase akhir setelah transaksi berhasil disimpan di *database*.
*   **Redirect:** Sistem mengarahkan (*redirect*) pelanggan kembali ke rute `/dashboard`.
*   **Tampilan Hasil:** Di Dashboard, pesanan akan otomatis muncul di grid **"Penyewaan Aktif"** dengan *badge* status **"Menunggu Pembayaran"**.