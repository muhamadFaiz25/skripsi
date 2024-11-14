import { Elysia } from 'elysia';
import mysql from 'mysql2/promise';

const app = new Elysia();
const port = 3004;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
};

let connection;

async function connectToDatabase() {
  connection = await mysql.createConnection(dbConfig);
  console.log("Connected to MySQL database!");
}

connectToDatabase().catch(err => console.error(err));

app.post('/post10data', async () => {
  try {
    for (let i = 1; i <= 10; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;
      await connection.query(sql, [data.id, data.name, data.age]);
    }

    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.post('/post100data', async () => {
  try {
    for (let i = 1; i <= 100; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;
      await connection.query(sql, [data.id, data.name, data.age]);
    }

    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.post('/post500data', async () => {
  try {
    for (let i = 1; i <= 500; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;
      await connection.query(sql, [data.id, data.name, data.age]);
    }

    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.post('/post1000data', async () => {
  try {
    for (let i = 1; i <= 1000; i++) {
      const data = {
        id: i,
        name: "luffy",
        age: Math.floor(Math.random() * 80),
      };

      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;
      await connection.query(sql, [data.id, data.name, data.age]);
    }

    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.get('/', () => {
  return 'hello world';
});

app.get('/get10data', async () => {
  const sql = "SELECT * FROM users LIMIT 10";
  const [results] = await connection.query(sql);
  return results;
});

app.get('/get100data', async () => {
  const sql = "SELECT * FROM users LIMIT 100";
  const [results] = await connection.query(sql);
  return results;
});

app.get('/get500data', async () => {
  const sql = "SELECT * FROM users LIMIT 500";
  const [results] = await connection.query(sql);
  return results;
});

app.get('/get1000data', async () => {
  const sql = "SELECT * FROM users LIMIT 1000";
  const [results] = await connection.query(sql);
  return results;
});

app.get('/getdata', async () => {
  const sql = "SELECT * FROM users";
  const [results] = await connection.query(sql);
  return results;
});

app.put('/put10data', async () => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 10";
  const [results] = await connection.query(sqlSelect);

  const ids = results.map(result => result.id);
  if (ids.length === 0) {
    return { message: "No users found" };
  }

  const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
  await connection.query(sqlUpdate, [newName, newAge]);

  return { message: "Data updated successfully" };
});

app.put('/put100data', async () => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 100";
  const [results] = await connection.query(sqlSelect);

  const ids = results.map(result => result.id);
  if (ids.length === 0) {
    return { message: "No users found" };
  }

  const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
  await connection.query(sqlUpdate, [newName, newAge]);

  return { message: "Data updated successfully" };
});

app.put('/put500data', async () => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 500";
  const [results] = await connection.query(sqlSelect);

  const ids = results.map(result => result.id);
  if (ids.length === 0) {
    return { message: "No users found" };
  }

  const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
  await connection.query(sqlUpdate, [newName, newAge]);

  return { message: "Data updated successfully" };
});

app.put('/put1000data', async () => {
  const newName = 'zorro';
  const newAge = 24;

  const sqlSelect = "SELECT id FROM users LIMIT 1000";
  const [results] = await connection.query(sqlSelect);

  const ids = results.map(result => result.id);
  if (ids.length === 0) {
    return { message: "No users found" };
  }

  const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
  await connection.query(sqlUpdate, [newName, newAge]);

  return { message: "Data updated successfully" };
});

app.put('/:id', async ({ params }) => {
  const id = params.id;
  const name = 'zorro';
  const age = 24;

  const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;
  const [results] = await connection.query(sql, [name, age, id]);

  if (results.affectedRows === 0) {
    return { message: "User not found" };
  }

  return { message: "Data updated successfully" };
});

app.delete('/delete10data', async () => {
  const sql = `DELETE FROM users`;
  await connection.query(sql);

  return { message: "Data deleted successfully" };
});

app.delete('/delete100data', async () => {
  const sql = `DELETE FROM users`;
  await connection.query(sql);

  return { message: "Data deleted successfully" };
});

app.delete('/delete500data', async () => {
  const sql = `DELETE FROM users`;
  await connection.query(sql);

  return { message: "Data deleted successfully" };
});

app.delete('/delete1000data', async () => {
  const sql = `DELETE FROM users`;
  await connection.query(sql);

  return { message: "Data deleted successfully" };
});

app.delete('/', async () => {
  const sql = `DELETE FROM users`;
  await connection.query(sql);

  return { message: "Data deleted successfully" };
});

app.listen(port, () => {
  console.log(`Server berjalan di port http://localhost:${port}`);
});
