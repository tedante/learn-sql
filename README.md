## Learn SQL

### Sesi 1: Fondasi & Mental Model (The Big Picture)

- **Demo & Simulasi:** Menunjukkan kekuatan SQL dalam menarik data dari ribuan baris dalam hitungan detik.
- **Database vs Spreadsheet:** Memahami kapan harus pindah dari Excel/Stata ke PostgreSQL (Data integrity & Reproducibility).
- **Struktur Relasional:** Mengenal Tabel, Baris (Observasi), dan Kolom (Variabel).
- **Setup Lingkungan:** Instalasi PostgreSQL dan pengenalan _tool_ (pgAdmin/DBeaver).

### Sesi 2: Membangun & Mengelola Data (Data Management)

- **Membangun Tabel (CREATE TABLE):** Menentukan tipe data (Integer, Varchar, Date, Numeric).
- **Mengisi Data (INSERT):** Memasukkan data penelitian baru ke dalam tabel.
- **Koreksi Data (UPDATE & DELETE):** Memperbaiki eror input dan menghapus data yang tidak valid.
- **Disiplin WHERE:** Memahami pentingnya filter agar tidak terjadi "bencana" modifikasi data massal.

### Sesi 3: Penarikan Data Dasar (Data Discovery)

- **Seleksi Kolom (SELECT):** Memilih variabel yang dibutuhkan untuk analisis.
- **Penyaringan Baris (WHERE):** Menggunakan operator perbandingan (`=`, `>`, `<`) dan logika (`AND`, `OR`).
- **Pencarian Pola & Range:** Menggunakan `LIKE` untuk teks dan `BETWEEN` untuk angka/tanggal.
- **Pengurutan (ORDER BY):** Merapikan hasil data dari yang terbesar atau terkecil.

### Sesi 4: Agregasi & Ringkasan (The Pivot Logic)

- **Statistik Deskriptif:** Menggunakan `COUNT`, `SUM`, `AVG`, `MIN`, dan `MAX` untuk melihat tren data.
- **Konsep Grouping (GROUP BY):** Membuat ringkasan per kategori (identik dengan `collapse` di Stata).
- **Filter Agregasi (HAVING):** Menyaring hasil kelompok (misal: "Wilayah dengan angka kemiskinan di atas rata-rata").
- **Handling Duplicate:** Menggunakan `DISTINCT` untuk melihat nilai unik.

### Sesi 5: Menghubungkan Dataset (The Join Strategy)

- **Relasi Antar Tabel:** Memahami Primary Key dan Foreign Key (Kenapa data dipisah-pisah?).
- **Inner Join:** Menggabungkan data yang berpasangan sempurna di kedua dataset.
- **Left Join:** Menjaga agar responden tidak hilang meskipun data tindak-lanjutnya (follow-up) kosong.
- **Multiple Joins:** Menghubungkan 3 tabel atau lebih dalam satu alur analisis.

### Sesi 6: Pembersihan & Transformasi (Advanced Analysis)

- **Logika Kondisional (CASE WHEN):** Membuat variabel baru atau pengkodean ulang (_recode_) data.
- **Manajemen Missing Values:** Menggunakan `COALESCE` untuk menangani data kosong (NULL).
- **Fungsi String & Casting:** Merapikan teks dan mengubah tipe data yang tidak sesuai.
- **Query Terstruktur (CTE):** Menulis query menggunakan `WITH` agar alur kerja penelitian mudah dibaca dan diaudit.

---
