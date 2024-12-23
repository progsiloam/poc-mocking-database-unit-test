# Folder Structure

**/app**

- `/@types` : Untuk menampung file penambahan custom `property` atau custom `object` ke dalam interface (3rd Party Library).
- `/config` : Untuk menampung file config yang digunakan pada application.
- `/constants` : Untuk menampung file constants, penamaan enum dan file harus dalam bentuk jamak, contoh: `roles.constant.ts` (`Roles`).
- `/controllers` : Untuk menampung file controllers, di dalam file controller ini tidak boleh ada business logic.
- `/ioc` : Untuk menampung config Dependency Injection. List class dari Dependency Injection didaftarkan di dalam `/ioc/loader.ts`.
- `/middlewares` : Untuk menampung file middleware yang digunakan pada application, contoh: Middleware untuk Check Auth.
- `/models` : Untuk menampung file model dari database.
- `/queries` : Untuk menampung file yang akan menjalankan query ke database, seperti get data atau create data. Tidak boleh ada validasi di dalam file ini.
- `/repositories` : Untuk menampung file yang berisi business logic.
- `/services` : Untuk menampung file yang meng-handle pemanggilan ke external API, contoh: `AX Service`, `Budget Service`, `Staging Service`.
- `/types` : Untuk menampung file `interface` yang dibutuhkan oleh application.
- `/utils` : Untuk menampung file yang fungsinya hanya sebagai helper / utility, contoh: file yang berisikan utility untuk generate dan check jwt token.

**/tests**

Sebagai penampung file unit test, struktur folder ini mengikuti struktur `/app` dan filename ditambahkan `.test.ts`

# Process Flow

Request akan masuk melalui `controllers` dan akan diteruskan ke `repositories` untuk diproses sesuai business logic dan akan memanggil `queries` untuk menjalankan proses ke database.

# Versioning

Untuk versioning harus ditambahkan ke dalam `CHANGELOG.md` dan version terakhir harus ter-refleksi ke dalam `package.json`.

Versioning menggunakan Semantic Versioning `MAJOR.MINOR.PATCH` dengan aturan sebagai berikut:

- `MAJOR` : Upgrade Framework (LTS)
- `MINOR` : Penambahan features
- `PATCH` : Untuk bug fixing, security vulnerability, tech debt

# Naming Case

- File Name: `camelCase`, contoh: `legalEntity.model.ts`, `legalEntity.query.ts`
- Nama Class dan Interface: `PascalCase`, contoh: `LegalEntity`, `LegalEntityAttributes`,
- Database (Table, Column): `snake_case`, contoh: `legal_entity`
- Routes API: `kebab-case`, contoh: `legal-entity`, `legal-entity/save-data`

# Start New Project

1. Clone project ini
2. Clone project baru yang akan dibuat
3. Copy hasil isi clone dari project ini ke folder project baru (Exclude folder `.git`)
4. Hapus file `query.sql`
5. Hapus file yang ada di folder `controllers` (kecuali `version.controller.ts`)
6. Hapus file yang ada di folder `models` (kecuali `index.ts`)
7. Hapus file yang ada di folder `repositories`
8. Hapus file yang ada di folder `queries`
9. Hapus file yang ada di folder `services`
10. Pindah isi `CHANGELOG.md` ke `README.md`
11. `README.md` dan `version` pada `package.json` direset menjadi `0.0.0`
12. Ubah `# Express Template Changelog` pada `README.md` menjadi `# Nama Project Baru Changelog`
13. Ubah `name` pada `package.json` sesuai dengan nama project baru.
14. Ubah `debug('template-expressjs:server');` pada `app/server.ts` menjadi `debug('nama-project-baru:server');`
15. Ubah `name` dan `description` pada object `spec` sesuai dengan nama project baru.
