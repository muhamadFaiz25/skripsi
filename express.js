const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configurasi database dengan connection pooling
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
  connectionLimit: 10, // Batas koneksi pool
};

const pool = mysql.createPool(dbConfig);

app.use(express.json());

// Fungsi untuk menyisipkan data dalam jumlah besar menggunakan batch insert
const insertData = async (count, res) => {
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

    res.status(201).json({ message: `Data created successfully for ${count} entries` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Route untuk menambahkan data dengan berbagai jumlah
app.post('/post10data', (req, res) => insertData(10, res));
app.post('/post100data', (req, res) => insertData(100, res));
app.post('/post500data', (req, res) => insertData(500, res));
app.post('/post1000data', (req, res) => insertData(1000, res));

// Fungsi untuk mendapatkan data berdasarkan limit
const getData = (limit, res) => {
  const sql = `SELECT * FROM users LIMIT ${limit}`;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.json(results);
  });
};

// Routes untuk mendapatkan data
app.get('/get10data', (req, res) => getData(10, res));
app.get('/get100data', (req, res) => getData(100, res));
app.get('/get500data', (req, res) => getData(500, res));
app.get('/get1000data', (req, res) => getData(1000, res));

// Fungsi untuk memperbarui data
const updateData = (limit, newName, newAge, res) => {
  const sqlSelect = `SELECT id FROM users LIMIT ${limit}`;
  pool.query(sqlSelect, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    const ids = results.map(result => result.id);
    if (ids.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
    pool.query(sqlUpdate, [newName, newAge], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating data" });
      }
      res.status(200).json({ message: `Data updated successfully for ${limit} entries` });
    });
  });
};

// Routes untuk memperbarui data
app.put('/put10data', (req, res) => updateData(10, 'zorro', 24, res));
app.put('/put100data', (req, res) => updateData(100, 'zorro', 24, res));
app.put('/put500data', (req, res) => updateData(500, 'zorro', 24, res));
app.put('/put1000data', (req, res) => updateData(1000, 'zorro', 24, res));

// Fungsi untuk menghapus data
const deleteData = (res) => {
  const sql = `DELETE FROM users`;
  pool.query(sql, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting data" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  });
};

// Routes untuk menghapus data
app.delete('/delete10data', (req, res) => deleteData(res));
app.delete('/delete100data', (req, res) => deleteData(res));
app.delete('/delete500data', (req, res) => deleteData(res));
app.delete('/delete1000data', (req, res) => deleteData(res));
app.delete('/', (req, res) => deleteData(res));

// Route default
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server berjalan di port http://localhost:${port}`);
});
