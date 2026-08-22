# SPK Seleksi Magang BPS Kota Madiun 📊

Aplikasi Sistem Pendukung Keputusan (SPK) berbasis Web untuk seleksi peserta magang menggunakan kombinasi metode **Analytical Hierarchy Process (AHP)** dan **Simple Additive Weighting (SAW)**, yang diintegrasikan dengan **Artificial Intelligence (Auto-Scoring)** menggunakan **NLP IndoBERT** dan **Gemini API**.

---

## 🛠️ Tech Stack & Requirements

Aplikasi ini dibangun menggunakan arsitektur Modern Monolith (Server-Side Rendering) dengan rincian teknologi:

**Backend & Core:**
- **PHP:** `^8.2`
- **Laravel Framework:** `^12.0`
- **Database:** MySQL
- **AI Integration (LLM):** `laravel/ai` (^0.7.2) untuk koneksi Gemini API
- **PDF Generator:** `barryvdh/laravel-dompdf` (^3.1)

**Frontend:**
- **React.js:** `^18.2.0` (via Vite)
- **Inertia.js:** `inertiajs/inertia-laravel` (^2.0) & `@inertiajs/react` (^2.0.0)
- **Styling:** Tailwind CSS (`^3.2.1`), `@headlessui/react`, `@tailwindcss/forms`
- **Routing Helper:** `tightenco/ziggy` (^2.0)

**Layanan Eksternal:**
- API Python (FastAPI) berjalan di lokal untuk inferensi model **IndoBERT (NER)**.

---

## 🚀 Cara Instalasi (Installation Guide)

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di komputer lokal Anda:

### 1. Clone Repository
```bash
git clone [https://github.com/username-kamu/nama-repo-kamu.git](https://github.com/username-kamu/nama-repo-kamu.git)
cd nama-repo-kamu
```

### 2. Install Dependensi PHP (Composer)
Pastikan Anda sudah menginstal Composer. Jalankan perintah:
```bash
composer install
```

### 3. Install Dependensi Node.js (NPM)
Pastikan Anda sudah menginstal Node.js. Jalankan perintah:
```bash
npm install
```

### 4. Konfigurasi Environment (.env)
Salin file .env.example menjadi .env:
```bash
cp .env.example .env
```
Buka file .env dan sesuaikan konfigurasi database dan API Anda:

```js
# Konfigurasi Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_spk_magang
DB_USERNAME=root
DB_PASSWORD=

# Konfigurasi API AI (Sesuaikan dengan milik Anda)
GEMINI_API_KEY="masukkan_api_key_gemini_anda_di_sini"
AI_PYTHON_URL="[http://127.0.0.1:8001](http://127.0.0.1:8001)"
```

Generate Application Key Laravel:
```bash
php artisan key:generate
```

### 5. Konfigurasi Penyimpanan (Storage)
Buat symlink agar dokumen PDF (CV dan Proposal) yang diunggah pelamar dapat diakses secara publik:
```bash
php artisan storage:link
```

### 6. Migrasi Database & Seeder
Pastikan database MySQL sudah aktif (melalui XAMPP/Laragon). Jalankan migrasi beserta data awal (seeder) untuk akun Admin dan Kriteria AHP:
```bash
php artisan migrate:fresh --seed
```

---

## 🏃‍♂️ Menjalankan Aplikasi (Running the App)
Untuk menjalankan aplikasi ini secara penuh, Anda membutuhkan 3 terminal yang berjalan bersamaan:

Terminal 1: Menjalankan Server Laravel (Backend)
```bash
php artisan serve
```
(Aplikasi akan berjalan di http://127.0.0.1:8000)

Terminal 2: Menjalankan Vite (Frontend React)
```bash
npm run dev
```

Terminal 3: Menjalankan Server AI Python (IndoBERT)
(Catatan: Pastikan Anda telah mengatur environment Python dan menginstal FastAPI, Uvicorn, dan Transformers sesuai dokumentasi di folder /ai-server)
```bash
# Masuk ke direktori server python (ubah sesuai nama foldermu)
cd ai-server
uvicorn main:app --port 8001 --reload
```

---

## 🔐 Default Login Credentials
Gunakan akun berikut yang telah dibuat secara otomatis oleh Seeder untuk masuk ke dalam sistem:

**Akun Administrator:**
- **Email:** admin01@gmailcom
- **Password:** admin123

**Akun Pelamar:**
- **Email:** user01@gmail.com
- **Password:** 01user123

---

## 📝 Lisensi
Proyek ini bersifat open-source dan berada di bawah lisensi MIT license.
