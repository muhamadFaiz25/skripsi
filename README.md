# bun

To install dependencies:

```bash
bun install
```

sebelum menjalankan pengujian silahkan import terlebih dahulu database yang telah di lampirkan pada folder database ke mysql

To run:
untuk menguji menggunakan apache benchmark silahkan menggunakan perintah ini :
```bash
bun run run_ab_test4.js
```

untuk menguji menggunakan mitata js silahkan ikuti langkah-langkah ini:
yang pertama pilih file framework yang ingin di ujikan

## Project Structure

```plaintext
bun/
├── database/
│   └── testing.sql
├── draft skripsi/
│   └── DRAFT SKRIPSI 2.1.pdf
├── .gitignore
├── ab.exe
├── abs,exe
├── elysia.ts             # Server file for Elysia framework
├── express.js            # Server file for Express framework
├── fastify.js            # Server file for Fastify framework
├── hapi.js               # Server file for Hapi framework
├── jsconfig.json
├── koa.js                # Server file for Koa framework
├── mitata3.js
├── nest.ts               # Server file for Nest framework
├── package.json              # Package configuration file
├── README.md                 # Documentation file for project overview and instructions
└── run_ab_tests4.js

setelah itu jalan kan perintah ini untuk menjalankan server frameworknya:
```bash
bun run <file framework>
```
selanjutnya buka terminal baru untuk menjalankan file pengujian mitata3.js
dengan perintah:
```bash
bun run mitata3.js
```

