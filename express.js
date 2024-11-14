const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

app.use(express.json());

app.post('/post10data', async (req, res) => {
  try {
    for (let i = 1; i <= 10; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

      connection.query(sql, [data.id, data.name, data.age], (err, results) => {
        if (err) throw err;
      });
    }

    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating user" });
  }
});

app.post('/post100data', async (req, res) => {
  try {
    for (let i = 1; i <= 100; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

      connection.query(sql, [data.id, data.name, data.age], (err, results) => {
        if (err) throw err;
      });
    }

    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating user" });
  }
});

app.post('/post500data', async (req, res) => {
  try {
    for (let i = 1; i <= 500; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

      connection.query(sql, [data.id, data.name, data.age], (err, results) => {
        if (err) throw err;
      });
    }

    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating user" });
  }
});

app.post('/post1000data', async (req, res) => {
  try {
    for (let i = 1; i <= 1000; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

      connection.query(sql, [data.id, data.name, data.age], (err, results) => {
        if (err) throw err;
      });
    }

    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating user" });
  }
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/get10data', (req, res) => {
  const sql = "SELECT * FROM users LIMIT 10";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.json(results);
  });
});


app.get('/get100data', (req, res) => {
  const sql = "SELECT * FROM users LIMIT 100";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.json(results);
  });
});

app.get('/get500data', (req, res) => {
  const sql = "SELECT * FROM users LIMIT 500";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.json(results);
  });
});

app.get('/get1000data', (req, res) => {
  const sql = "SELECT * FROM users LIMIT 500";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.json(results);
  });
});

app.get('/getdata', (req, res) => {
  const sql = "SELECT * FROM users";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.json(results);
  });
});

app.put('/put10data', (req, res) => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 10";
  connection.query(sqlSelect, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    const ids = results.map(result => result.id);
    if (ids.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating data" });
      }

      res.status(200).json({ message: "Data updated successfully" });
    });
  });
});

app.put('/put100data', (req, res) => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 100";
  connection.query(sqlSelect, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    const ids = results.map(result => result.id);
    if (ids.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating data" });
      }

      res.status(200).json({ message: "Data updated successfully" });
    });
  });
});

app.put('/put500data', (req, res) => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 500";
  connection.query(sqlSelect, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    const ids = results.map(result => result.id);
    if (ids.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating data" });
      }

      res.status(200).json({ message: "Data updated successfully" });
    });
  });
});

app.put('/put1000data', (req, res) => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 1000";
  connection.query(sqlSelect, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    const ids = results.map(result => result.id);
    if (ids.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating data" });
      }

      res.status(200).json({ message: "Data updated successfully" });
    });
  });
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = 'zorro';
  const age = 24;

  const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;

  connection.query(sql, [name, age, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating data" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Data updated successfully" });
  });
});

app.delete('/delete10data', (req, res) => {
  const sql = `DELETE FROM users`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting data" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});

app.delete('/delete100data', (req, res) => {
  const sql = `DELETE FROM users`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting data" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});

app.delete('/delete500data', (req, res) => {
  const sql = `DELETE FROM users`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting data" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});

app.delete('/delete1000data', (req, res) => {
  const sql = `DELETE FROM users`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting data" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});

app.delete('/', (req, res) => {
  const sql = `DELETE FROM users`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting data" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di port http://localhost:${port}`);
});
