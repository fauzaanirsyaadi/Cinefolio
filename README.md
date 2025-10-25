# Cinefolio - Next.js Portfolio & Admin Dashboard

Selamat datang di Cinefolio, sebuah aplikasi web portofolio sinematik yang dibangun dengan Next.js, Tailwind CSS, dan ShadCN UI. Proyek ini tidak hanya berfungsi sebagai etalase untuk karya kreatif tetapi juga mencakup dasbor admin yang berfungsi penuh untuk mengelola konten proyek, lengkap dengan sistem autentikasi pengguna.

Aplikasi ini dirancang untuk menjadi modern, minimalis, dan berperforma tinggi, memanfaatkan fitur-fitur terbaru dari Next.js seperti App Router dan Server Actions.

## Fitur Utama

- **Manajemen Proyek (CRUD)**: Dasbor admin memungkinkan pengguna yang diautentikasi untuk membuat, membaca, memperbarui, dan menghapus proyek portofolio.
- **Sistem Autentikasi Pengguna**:
    - **Registrasi Pengguna**: Pengguna baru dapat mendaftar untuk membuat akun.
    - **Verifikasi OTP via Email**: Akun baru harus diverifikasi menggunakan *One-Time Password* (OTP) yang dikirim ke email pengguna melalui **Resend**.
    - **Kirim Ulang OTP**: Fungsionalitas untuk mengirim ulang kode verifikasi jika diperlukan.
    - **Login & Logout**: Sistem login berbasis sesi yang aman.
    - **Keamanan Kata Sandi**: Kata sandi di-hash menggunakan `bcryptjs` sebelum disimpan ke database.
    - **Manajemen Sesi**: Sesi pengguna dikelola menggunakan `iron-session`.
- **Database Supabase**: Menggunakan Supabase (PostgreSQL) sebagai database untuk menyimpan data pengguna dan proyek.
- **Desain Responsif**: Antarmuka yang dibuat dengan ShadCN UI dan Tailwind CSS beradaptasi dengan baik di berbagai ukuran layar.
- **Halaman Statis**: Termasuk halaman "Tentang", "Kontak", dan halaman legal lainnya.
- **Struktur Proyek Next.js Modern**: Menggunakan App Router, Server Components, dan Server Actions.

## Tumpukan Teknologi

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Autentikasi & Sesi**: [iron-session](https://github.com/vvo/iron-session), [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Pengiriman Email**: [Resend](https://resend.com/)
- **Validasi Form**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Memulai

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal.

### 1. Prasyarat

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau package manager pilihan Anda
- Akun [Supabase](https://supabase.com/)
- Akun [Resend](https://resend.com/)

### 2. Instalasi

a. **Kloning Repositori**
   ```bash
   git clone <URL_REPOSITORI_ANDA>
   cd <NAMA_DIREKTORI_PROYEK>
   ```

b. **Instal Dependensi**
   ```bash
   npm install
   ```

### 3. Konfigurasi Lingkungan

a. **Buat file `.env.local`** di root proyek Anda.

b. **Salin dan tempel konten berikut ke dalam file `.env.local`** dan ganti dengan kredensial Anda sendiri:

   ```env
   # Kredensial Supabase (Pengaturan > API di dasbor Supabase Anda)
   NEXT_PUBLIC_SUPABASE_URL="https://<ID_PROYEK_ANDA>.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="KUNCI_ANON_PUBLIK_ANDA"

   # Kunci API Resend (Pengaturan > Kunci API di dasbor Resend Anda)
   RESEND_API_KEY="re_****************"

   # Kata Sandi Iron Session (Buat string acak yang kuat dengan 32 karakter atau lebih)
   IRON_SESSION_PASSWORD="KATA_SANDI_RAHASIA_KOMPLEKS_UNTUK_SESI"
   ```

### 4. Pengaturan Database Supabase

a. Buka proyek Supabase Anda dan navigasikan ke **SQL Editor**.

b. Jalankan skrip SQL berikut untuk membuat tabel `users` dan `projects`:

   ```sql
   -- Membuat tabel untuk pengguna
   CREATE TABLE public.users (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     is_active BOOLEAN DEFAULT FALSE NOT NULL,
     otp TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
     login_token TEXT,
     refresh_token TEXT
   );

   -- Membuat tabel untuk proyek portofolio
   CREATE TABLE public.projects (
       id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
       slug TEXT UNIQUE NOT NULL,
       title TEXT NOT NULL,
       category TEXT NOT NULL,
       shortDescription TEXT NOT NULL,
       description TEXT NOT NULL,
       coverImage TEXT,
       galleryImages TEXT[],
       created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
   );
   ```

   > **Catatan**: Untuk proyek produksi, Anda harus mengaktifkan *Row Level Security* (RLS) pada tabel Anda untuk keamanan.

### 5. Menjalankan Server Pengembangan

Setelah semua konfigurasi selesai, jalankan perintah berikut untuk memulai server pengembangan:

```bash
npm run dev
```

Buka [http://localhost:9002](http://localhost:9002) di browser Anda untuk melihat aplikasi berjalan.
