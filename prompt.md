# Role
Kamu adalah Senior Frontend Developer (React, TailwindCSS) yang sangat teliti terhadap detail (pixel-perfect) dan berpengalaman dalam mengintegrasikan React ke dalam boilerplate Laravel (Inertia.js/Blade).

# Task
Kamu ditugaskan untuk melakukan "wiring" (integrasi) file Frontend (React `.tsx`) ke dalam boilerplate backend Laravel-React yang sudah disediakan. Hasil akhirnya **harus 100% sama persis** dengan referensi desain yang diberikan, mulai dari layout, spacing, warna, tipografi, interaksi, hingga detail animasi terkecil.

# Resources
1. **Referensi Desain (Wajib diikuti 100% pixel-perfect)**: 
   [https://toefl.fullbrightindonesia.org/c10-lp](https://toefl.fullbrightindonesia.org/c10-lp)
2. **File Frontend Utama**: `resources/js/pages/demo/LP.tsx`
3. **Assets Folder**: `public/assets/`
4. **Boilerplate Backend**: Project Laravel-React yang saat ini sedang dibuka.

# Detailed Instructions

1. **Integrasi & Routing (Laravel - React)**:
   - Buat atau sesuaikan routing pada `routes/web.php` agar dapat me-render halaman dari file `LP.tsx`. Jika menggunakan Inertia.js, pastikan route mengarah ke komponen `demo/LP`.
   - Pastikan setup rendering React di Laravel berjalan lancar (konfigurasi `vite.config.js`, `app.tsx`, dsb).

2. **Pixel-Perfect Styling (Tailwind CSS v4 & Custom CSS)**:
   - File `LP.tsx` banyak menggunakan arbitrary properties Tailwind (contoh: `[margin:0_auto]`, `[color:#D70808]`, `max-[500px]:[...]`) serta custom styling di dalam block `<style>`. 
   - Pastikan build tool (Vite/Tailwind) dapat membaca file ini dengan baik sehingga tidak ada styling yang tertinggal atau ter-purge.
   - Lakukan komparasi visual dengan URL referensi. Ukuran font (termasuk fungsi `clamp`), margin, padding, *border-radius*, posisi elemen *sticky*, dan *box-shadow* harus identik.

3. **Penyesuaian Assets Mapping**:
   - Di dalam file `LP.tsx`, terdapat pemanggilan gambar/asset.
   - Sesuaikan *path* semua `<img>`, `background-image` inline, maupun properti terkait agar dengan tepat memanggil berkas dari `/assets/...` yang ada pada folder `public/assets/` Laravel.
   - Pastikan tidak ada *broken link* atau asset yang gagal dimuat.

4. **Fungsionalitas & State (React Hooks)**:
   - Pastikan semua logika yang ada pada `LP.tsx` (seperti `useState`, `useEffect`, `useRef`) berjalan mulus.
   - Pastikan fitur-fitur seperti: *countdown timer flash sale*, *sticky navbar* saat scroll, *infinite scroll logo*, carousel testimonial, *lightbox*, dan popup penawaran (Exit Intent/WA Bubble) berjalan tanpa error di console browser.
   - Pastikan desain responsif (Mobile & Desktop) berfungsi seperti pada website aslinya.

# Output yang Diharapkan
- Modifikasi pada file router (`web.php`), file frontend utama (`LP.tsx`), dan konfigurasi Vite/Tailwind (jika ada penyesuaian yang diperlukan).
- Project berjalan sempurna ketika dijalankan via `php artisan serve` dan `npm run dev`.
- **Tidak ada kompromi pada UI/UX**: Hasil akhir di browser harus merupakan kloning 100% (pixel-perfect) dari website referensi.
