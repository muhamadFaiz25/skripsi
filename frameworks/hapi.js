const Hapi = require('@hapi/hapi');
const mysql = require('mysql');

// Konfigurasi database dengan connection pooling
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
  connectionLimit: 10, // Batas koneksi pool
};

const pool = mysql.createPool(dbConfig);

// Fungsi untuk menyisipkan data dalam jumlah besar menggunakan batch insert
const insertData = async (count, h) => {
  try {
    const batchSize = 100; // Ukuran batch untuk mengurangi beban memori
    const batches = Math.ceil(count / batchSize);

    for (let i = 0; i < batches; i++) {
      const values = [];
      for (let j = 1; j <= Math.min(batchSize, count - i * batchSize); j++) {
        values.push([i * batchSize + j, "luffy", Math.floor(Math.random() * 80)]);
      }

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES ?`;
      await new Promise((resolve, reject) => {
        pool.query(sql, [values], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    return h.response({ message: `Data created successfully for ${count} entries` }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ message: "Error creating user" }).code(500);
  }
};

// Fungsi untuk mendapatkan data berdasarkan limit
const getData = (limit, h) => {
  const sql = `SELECT * FROM users LIMIT ${limit}`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        return resolve(h.response({ message: "Error fetching data" }).code(500));
      }
      resolve(h.response(results));
    });
  });
};

// Fungsi untuk memperbarui data
const updateData = (limit, newName, newAge, h) => {
  const sqlSelect = `SELECT id FROM users LIMIT ${limit}`;
  return new Promise((resolve, reject) => {
    pool.query(sqlSelect, (err, results) => {
      if (err) {
        console.error(err);
        return resolve(h.response({ message: "Error fetching data" }).code(500));
      }

      const ids = results.map(result => result.id);
      if (ids.length === 0) {
        return resolve(h.response({ message: "No users found" }).code(404));
      }

      const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
      pool.query(sqlUpdate, [newName, newAge], (err) => {
        if (err) {
          console.error(err);
          return resolve(h.response({ message: "Error updating data" }).code(500));
        }
        resolve(h.response({ message: `Data updated successfully for ${limit} entries` }).code(200));
      });
    });
  });
};

// Fungsi untuk menghapus data
const deleteData = (h) => {
  const sql = `DELETE FROM users`;
  return new Promise((resolve, reject) => {
    pool.query(sql, (err) => {
      if (err) {
        console.error(err);
        return resolve(h.response({ message: "Error deleting data" }).code(500));
      }
      resolve(h.response({ message: "Data deleted successfully" }).code(200));
    });
  });
};

// Inisialisasi server Hapi
const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost'
  });

  // Routes untuk menambahkan data dengan berbagai jumlah
  server.route([
    { method: 'POST', path: '/post10data', handler: (req, h) => insertData(10, h) },
    { method: 'POST', path: '/post100data', handler: (req, h) => insertData(100, h) },
    { method: 'POST', path: '/post500data', handler: (req, h) => insertData(500, h) },
    { method: 'POST', path: '/post1000data', handler: (req, h) => insertData(1000, h) }
  ]);

  // Routes untuk mendapatkan data
  server.route([
    { method: 'GET', path: '/get10data', handler: (req, h) => getData(10, h) },
    { method: 'GET', path: '/get100data', handler: (req, h) => getData(100, h) },
    { method: 'GET', path: '/get500data', handler: (req, h) => getData(500, h) },
    { method: 'GET', path: '/get1000data', handler: (req, h) => getData(1000, h) }
  ]);

  // Routes untuk memperbarui data
  server.route([
    { method: 'PUT', path: '/put10data', handler: (req, h) => updateData(10, 'zorro', 24, h) },
    { method: 'PUT', path: '/put100data', handler: (req, h) => updateData(100, 'zorro', 24, h) },
    { method: 'PUT', path: '/put500data', handler: (req, h) => updateData(500, 'zorro', 24, h) },
    { method: 'PUT', path: '/put1000data', handler: (req, h) => updateData(1000, 'zorro', 24, h) }
  ]);

  // Routes untuk menghapus data
  server.route([
    { method: 'DELETE', path: '/delete10data', handler: (req, h) => deleteData(h) },
    { method: 'DELETE', path: '/delete100data', handler: (req, h) => deleteData(h) },
    { method: 'DELETE', path: '/delete500data', handler: (req, h) => deleteData(h) },
    { method: 'DELETE', path: '/delete1000data', handler: (req, h) => deleteData(h) }
  ]);

  // Route default
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => h.response('Hello World')
  });

  await server.start();
  console.log(`Server berjalan di port http://localhost:${server.info.port}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
