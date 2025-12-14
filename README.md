# EAS_SIGWeb

# 🌊 WebGIS Peta Kawasan Rawan Bencana (KRB) Tsunami & Jalur Evakuasi - Bali

![Badge Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)
![Badge GIS](https://img.shields.io/badge/ArcGIS%20Pro-Analysis-blue)
![Badge Status](https://img.shields.io/badge/Status-Live-brightgreen)

WebGIS ini merupakan peta interaktif yang memvisualisasikan zonasi risiko Tsunami di kawasan pesisir Bali (Studi Kasus: Bali Selatan), lengkap dengan **Jalur Evakuasi** dan titik **Shelter (Tempat Evakuasi Sementara/Akhir)**.

Proyek ini dibangun menggunakan **HTML5, CSS3, dan Leaflet.js**, dengan data spasial yang diolah menggunakan **ArcGIS Pro**.

🔗 **Demo Live:** [KLIK DI SINI UNTUK MELIHAT PETA](https://clarameivanda-jpg.github.io/EAS_SIGWeb/)

---

## 🗺️ Fitur Utama

1.  **Zonasi Risiko (KRB):** Visualisasi area berdasarkan tingkat kerentanan:
    * 🔴 **Zona Penyelamatan Vertikal (Bahaya):** Area dataran rendah dekat pantai. Wajib evakuasi vertikal (Gedung bertingkat).
    * 🟠 **Zona Penyangga (Waspada):** Area transisi yang aman dari tsunami kecil namun berisiko jika magnitudo besar.
    * 🟢 **Zona Aman Mutlak:** Area dataran tinggi/jauh dari jangkauan gelombang (Tempat Evakuasi Akhir).
2.  **Jalur Evakuasi:** Garis rute tercepat menuju tempat aman berdasarkan analisis jaringan jalan (*Network Analysis*).
3.  **Titik Shelter:** Lokasi gedung/lapangan yang divalidasi sebagai tempat pengungsian (TES & TEA), dilengkapi informasi kapasitas dan tipe bangunan.
4.  **Popup Interaktif:** Klik pada area/titik untuk melihat detail informasi risiko dan nama lokasi.

---

## 🔬 Metodologi Analisis Data

Data spasial dalam web ini dihasilkan melalui proses **Weighted Overlay** di ArcGIS Pro dengan parameter berikut:

| Parameter | Bobot | Keterangan |
| :--- | :--- | :--- |
| **Elevasi (DEM)** | 40% | Semakin rendah (<5 mdpl) semakin berisiko tinggi. |
| **Jarak dari Pantai** | 30% | Semakin dekat (<500 m) semakin berisiko tinggi. |
| **Kemiringan Lereng (Slope)** | 20% | Area datar (0-2°) mempercepat laju air. |
| **Jarak dari Sungai** | 10% | Sungai sebagai jalan masuk air (*inlet*) ke daratan. |

*Data di-export dari Raster menjadi Vektor (GeoJSON) setelah melalui proses simplifikasi geometri agar ringan dimuat di web.*

---

## 📂 Struktur Folder

Pastikan struktur file Anda seperti ini agar website berjalan lancar:

```text
peta-tsunami-bali/
│
├── index.html          # File utama (Peta & Logika JS)
├── README.md           # Dokumentasi proyek ini
└── data/               # Folder penyimpanan data spasial
    ├── krb.geojson     # Data Polygon Zona Risiko
    ├── shelter.geojson # Data Titik Tempat Evakuasi
    └── jalur.geojson   # Data Garis Rute Evakuasi
