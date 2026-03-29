# Cheat Sheet Sesi 6: Data Cleaning & Transformasi SQL

Gunakan lembar ringkas ini saat praktik cepat. Semua contoh memakai tabel `responden`.

---

## 1. CASE WHEN (Recode Variabel)

```sql
SELECT
    nama,
    umur,
    CASE
        WHEN umur < 25 THEN 'Muda'
        WHEN umur BETWEEN 25 AND 44 THEN 'Dewasa Awal'
        WHEN umur BETWEEN 45 AND 59 THEN 'Dewasa Akhir'
        ELSE 'Senior'
    END AS kategori_usia
FROM responden;
```

```sql
SELECT
    nama,
    pendapatan,
    CASE
        WHEN pendapatan < 5000000 THEN 'Rendah'
        WHEN pendapatan <= 15000000 THEN 'Menengah'
        ELSE 'Tinggi'
    END AS status_ekonomi
FROM responden;
```

---

## 2. NULL Handling (COALESCE + NULLIF)

```sql
SELECT
    nama,
    COALESCE(NULLIF(email, ''), 'tidak_tersedia@example.com') AS email_bersih,
    COALESCE(pekerjaan, 'Belum Bekerja') AS pekerjaan_bersih
FROM responden;
```

```sql
SELECT
    wilayah,
    ROUND(AVG(pendapatan), 0) AS avg_sql_default,
    ROUND(AVG(COALESCE(pendapatan, 0)), 0) AS avg_dengan_0
FROM responden
GROUP BY wilayah;
```

---

## 3. String Cleaning

```sql
SELECT
    INITCAP(TRIM(nama)) AS nama_standar,
    UPPER(TRIM(wilayah)) AS wilayah_standar,
    LENGTH(COALESCE(email, '')) AS panjang_email
FROM responden;
```

```sql
SELECT
    nama,
    CONCAT(SUBSTRING(INITCAP(nama), 1, 10), ' - ', UPPER(TRIM(wilayah))) AS label_responden
FROM responden;
```

---

## 4. Casting

```sql
SELECT
    pendapatan,
    pendapatan::TEXT AS pendapatan_teks,
    CAST(umur AS NUMERIC(10,2)) AS umur_decimal,
    CAST(tanggal_survey AS TEXT) AS tanggal_teks
FROM responden;
```

---

## 5. CTE (WITH) Pola Bertahap

```sql
WITH data_bersih AS (
    SELECT
        TRIM(wilayah) AS wilayah,
        COALESCE(pendapatan, 0) AS pendapatan,
        umur
    FROM responden
    WHERE umur IS NOT NULL
),
ringkasan AS (
    SELECT
        wilayah,
        COUNT(*) AS jumlah,
        ROUND(AVG(pendapatan), 0) AS rata_pendapatan,
        ROUND(AVG(umur), 1) AS rata_umur
    FROM data_bersih
    GROUP BY wilayah
)
SELECT *
FROM ringkasan
WHERE rata_pendapatan > 10000000
ORDER BY rata_pendapatan DESC;
```

---

## 6. Ranking Wilayah (CTE + Window Function)

```sql
WITH wilayah_avg AS (
    SELECT
        wilayah,
        ROUND(AVG(pendapatan), 0) AS avg_pendapatan,
        COUNT(*) AS n
    FROM responden
    GROUP BY wilayah
    HAVING COUNT(*) >= 50
)
SELECT
    wilayah,
    avg_pendapatan,
    n,
    DENSE_RANK() OVER (ORDER BY avg_pendapatan DESC) AS peringkat
FROM wilayah_avg
ORDER BY peringkat
LIMIT 5;
```

---

## 7. Debug Checklist Cepat

1. Cek NULL:

```sql
SELECT COUNT(*) FROM responden WHERE email IS NULL OR pekerjaan IS NULL;
```

2. Cek kategori hasil recode:

```sql
SELECT status_ekonomi, COUNT(*)
FROM (
    SELECT CASE
        WHEN pendapatan < 5000000 THEN 'Rendah'
        WHEN pendapatan <= 15000000 THEN 'Menengah'
        ELSE 'Tinggi'
    END AS status_ekonomi
    FROM responden
) t
GROUP BY status_ekonomi;
```

3. Cek dampak cleaning:

```sql
SELECT
    COUNT(*) AS total_awal,
    COUNT(TRIM(nama)) AS total_setelah_trim
FROM responden;
```

---

## 8. Urutan Kerja yang Direkomendasikan

1. Audit data mentah.
2. Bersihkan format teks.
3. Tangani NULL secara eksplisit.
4. Recode variabel untuk analisis.
5. Ringkas dengan CTE.
6. Validasi jumlah baris sebelum/sesudah transformasi.
