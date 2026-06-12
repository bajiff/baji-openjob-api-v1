# 🚀 OpenJob RESTful API V1

> **OpenJob** — Sebuah RESTful API untuk platform lowongan kerja (job portal) yang dibangun menggunakan **Express.js** dan **PostgreSQL**. API ini menyediakan fitur manajemen pengguna, autentikasi JWT, manajemen perusahaan, kategori pekerjaan, lowongan kerja, dan lamaran kerja.

![Node.js](https://img.shields.io/badge/Node.js-v24-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

---

## :ledger: Index

- [Introduction](#-openjob-restful-api-v1)
  - [:ledger: Index](#ledger-index)
  - [:beginner: About](#beginner-about)
  - [:zap: Usage](#zap-usage)
    - [:electric\_plug: Installation](#electric_plug-installation)
    - [:package: Commands](#package-commands)
  - [:wrench: Development](#wrench-development)
    - [:notebook: Pre-Requisites](#notebook-pre-requisites)
    - [:nut\_and\_bolt: Development Environment](#nut_and_bolt-development-environment)
    - [:file\_folder: File Structure](#file_folder-file-structure)
    - [:hammer: Build](#hammer-build)
    - [:rocket: Deployment](#rocket-deployment)
  - [:cherry\_blossom: Community](#cherry_blossom-community)
    - [:fire: Contribution](#fire-contribution)
    - [:cactus: Branches](#cactus-branches)
    - [:exclamation: Guideline](#exclamation-guideline)
  - [:question: FAQ](#question-faq)
  - [:page\_facing\_up: Resources](#page_facing_up-resources)
  - [:camera: Gallery](#camera-gallery)
  - [:star2: Credit/Acknowledgment](#star2-creditacknowledgment)
  - [:lock: License](#lock-license)
  - [:globe\_with\_meridians: My Social Media](#globe_with_meridians-my-social-media)
  - [:mailbox: Contact](#mailbox-contact)

---

## :beginner: About

**OpenJob RESTful API V1** adalah sebuah *backend service* untuk platform pencarian dan perekrutan kerja (*job portal*). Proyek ini dibangun sebagai submission dalam kursus **Belajar Fundamental Back-End dengan JavaScript** di [Dicoding](https://www.dicoding.com/).

API ini menggunakan arsitektur modular dengan pemisahan yang jelas antara *routes*, *handlers*, *services*, dan *validators*. Fitur-fitur utama meliputi:

- 🔐 **Autentikasi & Otorisasi** — Registrasi, login, dan pengelolaan token menggunakan JWT (Access Token & Refresh Token).
- 👤 **Manajemen Pengguna** — CRUD user dan profil pengguna.
- 🏢 **Manajemen Perusahaan** — CRUD data perusahaan yang membuka lowongan.
- 🏷️ **Kategori Pekerjaan** — Pengelompokan lowongan berdasarkan kategori.
- 💼 **Lowongan Kerja (Jobs)** — CRUD lowongan kerja dengan detail lengkap.
- 📝 **Lamaran Kerja (Applications)** — Pengguna dapat melamar pekerjaan yang tersedia.
- ✅ **Validasi Data** — Menggunakan **Joi** untuk validasi payload request.
- 🛡️ **Error Handling** — Custom error classes (ClientError, NotFoundError, InvariantError, AuthenticationError) dengan middleware error handler terpusat.

---

## :zap: Usage

API ini menyediakan beberapa endpoint RESTful yang dapat diakses menggunakan HTTP client seperti **Postman**, **cURL**, atau **Thunder Client**.

### Base URL

```
http://localhost:3000
```

### Endpoint Overview

| Method   | Endpoint             | Deskripsi                          | Auth |
|----------|----------------------|------------------------------------|------|
| `GET`    | `/`                  | Health check API                   | ❌   |
| `POST`   | `/users`             | Registrasi pengguna baru           | ❌   |
| `POST`   | `/authentications`   | Login (mendapatkan token)          | ❌   |
| `PUT`    | `/authentications`   | Refresh access token               | ❌   |
| `DELETE` | `/authentications`   | Logout (hapus refresh token)       | ❌   |
| `GET`    | `/profile`           | Lihat profil pengguna              | ✅   |
| `GET`    | `/companies`         | Lihat daftar perusahaan            | ❌   |
| `POST`   | `/companies`         | Tambah perusahaan                  | ✅   |
| `GET`    | `/categories`        | Lihat daftar kategori              | ❌   |
| `POST`   | `/categories`        | Tambah kategori                    | ✅   |
| `GET`    | `/jobs`              | Lihat daftar lowongan              | ❌   |
| `POST`   | `/jobs`              | Tambah lowongan kerja              | ✅   |
| `GET`    | `/applications`      | Lihat daftar lamaran               | ✅   |
| `POST`   | `/applications`      | Ajukan lamaran kerja               | ✅   |

> **✅ Auth** = Membutuhkan header `Authorization: Bearer <access_token>`

---

### :electric_plug: Installation

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek ini di lingkungan lokal Anda:

**1. Clone repository:**

```bash
git clone https://github.com/bajiff/baji-openjob-api-v1.git
cd baji-openjob-api-v1
```

**2. Install dependencies:**

```bash
npm install
```

**3. Konfigurasi environment variables:**

Buat file `.env` di root proyek dengan isi berikut:

```env
HOST=localhost
PORT=3000

PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=db_openjob
PGHOST=localhost
PGPORT=5432
DATABASE_URL=postgres://your_db_user:your_db_password@localhost:5432/db_openjob

ACCESS_TOKEN_KEY=your_access_token_secret_key
REFRESH_TOKEN_KEY=your_refresh_token_secret_key
```

**4. Buat database PostgreSQL:**

```bash
createdb db_openjob
```

**5. Jalankan migrasi database:**

```bash
npm run migrate up
```

**6. Jalankan server:**

```bash
# Mode development (dengan hot-reload)
npm run start:dev

# Mode production
npm start
```

Server akan berjalan di `http://localhost:3000`.

---

### :package: Commands

| Perintah               | Deskripsi                                        |
|------------------------|--------------------------------------------------|
| `npm start`            | Menjalankan server dalam mode production          |
| `npm run start:dev`    | Menjalankan server dalam mode development (nodemon) |
| `npm run lint`         | Menjalankan ESLint untuk pengecekan kode          |
| `npm run migrate up`   | Menjalankan migrasi database (naik)               |
| `npm run migrate down` | Menjalankan rollback migrasi database (turun)     |
| `npm run truncate`     | Mengosongkan data di tabel database               |

---

## :wrench: Development

### :notebook: Pre-Requisites

Pastikan sistem Anda sudah memiliki tools berikut:

| Tool         | Versi Minimum | Deskripsi                     |
|--------------|---------------|-------------------------------|
| **Node.js**  | v18+          | Runtime JavaScript            |
| **npm**      | v9+           | Package manager               |
| **PostgreSQL** | v14+        | Relational database           |
| **Git**      | v2+           | Version control               |

---

### :nut_and_bolt: Development Environment

1. **Fork & Clone** repository ini:

   ```bash
   git clone https://github.com/bajiff/baji-openjob-api-v1.git
   cd baji-openjob-api-v1
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup database:**

   ```bash
   # Buat database
   createdb db_openjob

   # Jalankan migrasi
   npm run migrate up
   ```

4. **Buat file `.env`** (lihat bagian [Installation](#electric_plug-installation) untuk format lengkap).

5. **Jalankan development server:**

   ```bash
   npm run start:dev
   ```

6. **Linting:**

   ```bash
   npm run lint
   ```

---

### :file_folder: File Structure

```bash
.
├── migrations/                              # Database migration files
│   ├── ..._create-table-users.js
│   ├── ..._create-table-authentications.js
│   ├── ..._create-table-companies.js
│   ├── ..._create-table-categories.js
│   ├── ..._create-table-jobs.js
│   └── ..._create-table-applications.js
├── src/
│   ├── api/                                 # Route & Handler (per module)
│   │   ├── applications/
│   │   │   ├── handler.js                   # Request handler
│   │   │   ├── index.js                     # Router factory
│   │   │   └── routes.js                    # Route definitions
│   │   ├── authentications/
│   │   │   ├── handler.js
│   │   │   ├── index.js
│   │   │   └── routes.js
│   │   ├── categories/
│   │   │   ├── handler.js
│   │   │   ├── index.js
│   │   │   ├── routes.js
│   │   │   └── schema.js
│   │   ├── companies/
│   │   │   ├── handler.js
│   │   │   ├── index.js
│   │   │   └── routes.js
│   │   ├── jobs/
│   │   │   ├── handler.js
│   │   │   ├── index.js
│   │   │   └── routes.js
│   │   ├── profile/
│   │   │   ├── handler.js
│   │   │   ├── index.js
│   │   │   └── routes.js
│   │   └── users/
│   │       ├── handler.js
│   │       ├── index.js
│   │       └── routes.js
│   ├── exceptions/                          # Custom Error Classes
│   │   ├── AuthenticationError.js
│   │   ├── ClientError.js
│   │   ├── InvariantError.js
│   │   └── NotFoundError.js
│   ├── middlewares/                         # Express Middlewares
│   │   ├── auth.js                          # JWT authentication middleware
│   │   └── errorHandler.js                  # Centralized error handler
│   ├── services/                            # Business Logic & Database
│   │   └── postgres/
│   │       ├── ApplicationsService.js
│   │       ├── AuthenticationsService.js
│   │       ├── CategoriesService.js
│   │       ├── CompaniesService.js
│   │       ├── JobsService.js
│   │       ├── UsersService.js
│   │       └── pool.js                      # PostgreSQL connection pool
│   ├── tokenize/                            # JWT Token Management
│   │   └── TokenManager.js
│   ├── validator/                           # Request Payload Validation (Joi)
│   │   ├── applications/
│   │   │   ├── index.js
│   │   │   └── schema.js
│   │   ├── authentications/
│   │   │   ├── index.js
│   │   │   └── schema.js
│   │   ├── categories/
│   │   │   ├── index.js
│   │   │   └── schema.js
│   │   ├── companies/
│   │   │   ├── index.js
│   │   │   └── schema.js
│   │   ├── jobs/
│   │   │   ├── index.js
│   │   │   └── schema.js
│   │   └── users/
│   │       ├── handler.js
│   │       ├── index.js
│   │       └── schema.js
│   └── server.js                            # Entry point aplikasi
├── .env                                     # Environment variables (tidak di-commit)
├── .env.example                             # Template environment variables
├── .gitignore
├── eslint.config.js                         # ESLint configuration
├── package.json
├── package-lock.json
├── truncate.js                              # Script untuk truncate tabel
└── README.md
```

| No | Direktori/File         | Detail                                                     |
|----|------------------------|-------------------------------------------------------------|
| 1  | `src/server.js`        | Entry point — inisialisasi Express, registrasi semua modul  |
| 2  | `src/api/`             | Kumpulan modul API (handler, routes, index per resource)    |
| 3  | `src/services/`        | Business logic & interaksi database PostgreSQL              |
| 4  | `src/validator/`       | Validasi payload request menggunakan Joi schema             |
| 5  | `src/exceptions/`      | Custom error classes untuk error handling yang konsisten     |
| 6  | `src/middlewares/`     | Middleware autentikasi JWT & error handler                  |
| 7  | `src/tokenize/`        | Manajemen pembuatan & verifikasi JWT token                  |
| 8  | `migrations/`          | File migrasi database (node-pg-migrate)                     |

---

### :hammer: Build

Proyek ini menggunakan **ES Modules** (`"type": "module"`) dan tidak memerlukan proses build. Cukup pastikan semua dependencies terinstal:

```bash
npm install
```

---

### :rocket: Deployment

Untuk deployment ke server produksi:

1. **Clone repository** ke server.
2. **Install dependencies:**

   ```bash
   npm install --production
   ```

3. **Konfigurasi `.env`** sesuai environment produksi.
4. **Jalankan migrasi database:**

   ```bash
   npm run migrate up
   ```

5. **Jalankan server:**

   ```bash
   npm start
   ```

> 💡 **Tip:** Gunakan process manager seperti [PM2](https://pm2.keymetrics.io/) untuk menjalankan aplikasi di production:
>
> ```bash
> npx pm2 start src/server.js --name "openjob-api"
> ```

---

## :cherry_blossom: Community

Proyek ini terbuka untuk kontribusi! Jika Anda tertarik untuk berkontribusi, silakan baca panduan di bawah ini.

### :fire: Contribution

Kontribusi Anda selalu disambut dan dihargai. Berikut beberapa cara untuk berkontribusi:

1. **Report a bug** 🐛

   Jika Anda menemukan bug, silakan laporkan melalui [Issues](https://github.com/bajiff/baji-openjob-api-v1/issues) dan saya akan menanganinya.

2. **Request a feature** 💡

   Anda juga dapat mengajukan fitur baru melalui [Issues](https://github.com/bajiff/baji-openjob-api-v1/issues), dan jika layak, akan dimasukkan ke dalam pengembangan.

3. **Create a pull request** 🔀

   Pull request Anda akan sangat dihargai oleh komunitas. Silakan pilih issue yang terbuka dari [sini](https://github.com/bajiff/baji-openjob-api-v1/issues) dan buat pull request.

> Jika Anda baru mengenal open-source, pastikan untuk membaca lebih lanjut [di sini](https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source) dan pelajari cara membuat pull request [di sini](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github).

---

### :cactus: Branches

Saya menggunakan metodologi *agile continuous integration*, sehingga versi sering diperbarui dan pengembangan berjalan cepat.

1. **`dev`** — Branch pengembangan (*development*).
2. **`main`** — Branch produksi (*production*).
3. Tidak ada branch permanen lain yang harus dibuat di repository utama. Anda dapat membuat *feature branch* tetapi harus di-merge ke `main`.

#### Steps to work with feature branch

1. Untuk mulai mengerjakan fitur baru, buat branch baru dengan prefix `feat` diikuti nama fitur. (contoh: `feat-add-bookmark-jobs`)
2. Setelah selesai, buat Pull Request.

#### Steps to create a pull request

1. Buat PR ke branch `dev`.
2. Patuhi best practices dan guideline, misalnya jika PR berkaitan dengan elemen visual, sertakan screenshot.
3. PR harus lolos semua pengecekan dan mendapatkan review positif.

Setelah itu, perubahan akan di-merge.

---

### :exclamation: Guideline

- Gunakan **ES Modules** (`import`/`export`) — bukan CommonJS (`require`).
- Ikuti pola arsitektur yang sudah ada: **API → Handler → Service → Database**.
- Validasi semua input menggunakan **Joi schema**.
- Gunakan **custom error classes** untuk error handling yang konsisten.
- Jalankan `npm run lint` sebelum membuat PR untuk memastikan kode bersih.
- Tulis komentar yang jelas pada bagian logika yang kompleks.

---

## :question: FAQ

**Q: Apakah saya harus membuat database secara manual?**

> Ya, Anda perlu membuat database PostgreSQL terlebih dahulu menggunakan perintah `createdb db_openjob`. Setelah itu, jalankan `npm run migrate up` untuk membuat tabel-tabel yang diperlukan.

**Q: Bagaimana cara mendapatkan access token?**

> Lakukan POST request ke `/authentications` dengan body `{ "username": "...", "password": "..." }`. Response akan berisi `accessToken` dan `refreshToken`.

**Q: Apakah API ini memiliki rate limiting?**

> Saat ini belum. Fitur rate limiting dan API key management direncanakan untuk versi berikutnya.

---

## :page_facing_up: Resources

- [Express.js v5 Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-pg-migrate Documentation](https://salsita.github.io/node-pg-migrate/)
- [Joi Validation Library](https://joi.dev/)
- [JSON Web Token (JWT)](https://jwt.io/)
- [Dicoding — Belajar Fundamental Back-End dengan JavaScript](https://www.dicoding.com/academies/271)

---

## :camera: Gallery

*Segera hadir — screenshots dan demo API menggunakan Postman.*

---

## :star2: Credit/Acknowledgment

- **Bagus Aji Fernando** (Baji) — Author & Developer
- [Dicoding Indonesia](https://www.dicoding.com/) — Platform pembelajaran yang menginspirasi proyek ini

---

## :lock: License

Proyek ini dilisensikan di bawah **ISC License**.

---

## :globe_with_meridians: My Social Media

Temukan saya di media sosial berikut:

| Platform     | Link                                                                                                                   |
|--------------|------------------------------------------------------------------------------------------------------------------------|
| **GitHub**   | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bajiff) |
| **LinkedIn** | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bagus-aji-fernando-466347286/) |
| **Instagram**| [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/_bajif) |
| **Threads**  | [![Threads](https://img.shields.io/badge/Threads-000000?style=for-the-badge&logo=threads&logoColor=white)](https://www.threads.com/@_bajif/) |
| **X**        | [![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://www.threads.com/@_bajif/) |   

---

## :mailbox: Contact

Hubungi saya melalui salah satu platform di atas atau buat issue di repository ini:

📧 **GitHub Issues:** [https://github.com/bajiff/baji-openjob-api-v1/issues](https://github.com/bajiff/baji-openjob-api-v1/issues)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/bajiff">Bagus Aji Fernando</a>
</p>
