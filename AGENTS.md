# AI Agent Development Guidelines

Dokumen ini berisi panduan, konteks, dan aturan (instructions) bagi AI Agents (seperti Copilot, Cursor, atau agent CLI) yang bekerja pada repositori/project ini.

## 1. Project Stack & Architecture
- **Backend**: Laravel
- **Frontend**: React (terintegrasi dengan Laravel, umumnya menggunakan Inertia.js atau sistem view React pada Vite)
- **Styling**: Tailwind CSS (dengan penggunaan *arbitrary properties* seperti `[color:#D70808]` yang cukup intensif pada komponen tertentu)
- **Bahasa Utama**: PHP, TypeScript (`.tsx`) / JavaScript (`.jsx`)

## 2. Struktur Direktori Utama
- `resources/js/`: Tempat seluruh komponen dan halaman React berada.
  - `resources/js/pages/`: Folder untuk komponen halaman penuh (misalnya `resources/js/pages/demo/LP.tsx`).
- `public/assets/`: Tempat penyimpanan aset statis (gambar, ikon, video). Panggil aset ini dari React dengan path absolut, contoh: `/assets/nama-file.webp`.
- `routes/web.php`: Konfigurasi routing Laravel (tempat mendaftarkan route yang me-return halaman React/Inertia).
- `app/Http/Controllers/`: Folder controller Laravel.

## 3. Aturan & Standar Pengembangan (Rules for AI)
1. **Pixel-Perfect UI**: Saat ditugaskan menyalin atau mengintegrasikan desain referensi (seperti file `LP.tsx`), pastikan hasilnya **100% sama persis**. Jangan mengubah properti *padding, margin, font-size, shadow*, ataupun custom *keyframes/animations* kecuali diminta.
2. **Validasi Aset**: JANGAN memanipulasi atau mengarang nama file aset. Selalu gunakan *search tools* (Glob/ls) untuk memeriksa eksistensi file di `public/assets/` sebelum menulis *path* di dalam tag `<img>` atau CSS.
3. **Konvensi Kode**:
   - Ikuti konvensi *hooks* bawaan React (`useEffect`, `useState`, `useRef`).
   - Jangan menghapus *class* atau *arbitrary properties* Tailwind yang terlihat panjang/kompleks, karena itu digunakan untuk mencapai desain *pixel-perfect*.
4. **Git Operations**: **JANGAN PERNAH** melakukan `git commit` tanpa izin eksplisit dari pengguna. Selalu periksa `git status` dan `git diff` untuk memastikan hanya file yang relevan yang diubah.

## 4. Command yang Sering Digunakan
AI Agents direkomendasikan untuk memverifikasi pekerjaan atau menjalankan *environment* dengan perintah berikut (melalui terminal/Bash tool):

- **Menjalankan Backend**: `php artisan serve`
- **Menjalankan Frontend (Vite)**: `npm run dev`
- **Build Frontend**: `npm run build`
- **Membersihkan Cache Laravel**: `php artisan optimize:clear`
- **Cek Tipe Data (TypeScript)**: `npm run typecheck` (jika tersedia di package.json)
- **Linting**: `npm run lint` (jika tersedia di package.json)

## 5. Konteks Project Saat Ini
Fokus utama yang sedang dikerjakan adalah *Trial Case* integrasi Landing Page:
- **Tujuan**: Mem-wiring halaman dari `resources/js/pages/demo/LP.tsx` ke dalam arsitektur Laravel-React.
- **Referensi Desain**: `https://toefl.fullbrightindonesia.org/c10-lp`
- Pastikan logika JavaScript, state management (seperti *countdown* dan pop-up interaktif), serta tata letak responsif (*mobile* vs *desktop*) berjalan lancar sesuai aslinya tanpa error di console browser.
