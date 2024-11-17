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

const insertData = async (batchSize) => {
  const values = [];
  for (let i = 1; i <= batchSize; i++) {
    values.push([i, 'luffy', Math.floor(Math.random() * 80)]);
  }
  const sql = `INSERT IGNORE INTO users (id, name, age) VALUES ?`;
  await connection.query(sql, [values]);
};

app.post('/post10data', async () => {
  try {
    await insertData(10);
    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.post('/post100data', async () => {
  try {
    await insertData(100);
    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.post('/post500data', async () => {
  try {
    await insertData(500);
    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.post('/post1000data', async () => {
  try {
    await insertData(1000);
    return { message: "Data created successfully" };
  } catch (err) {
    console.error(err);
    return { message: "Error creating user" };
  }
});

app.get('/', () => {
  return 'hello world';
});

const fetchData = async (limit) => {
  const sql = `SELECT * FROM users LIMIT ?`;
  const [results] = await connection.query(sql, [limit]);
  return results;
};

app.get('/get10data', async () => fetchData(10));
app.get('/get100data', async () => fetchData(100));
app.get('/get500data', async () => fetchData(500));
app.get('/get1000data', async () => fetchData(1000));
app.get('/getdata', async () => fetchData(10000));

const updateData = async (limit) => {
  const sqlSelect = `SELECT id FROM users LIMIT ?`;
  const [results] = await connection.query(sqlSelect, [limit]);
  const ids = results.map(result => result.id);
  
  if (ids.length === 0) {
    return { message: "No users found" };
  }

  const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (?)`;
  await connection.query(sqlUpdate, ['zorro', 24, ids]);
  return { message: "Data updated successfully" };
};

app.put('/put10data', async () => updateData(10));
app.put('/put100data', async () => updateData(100));
app.put('/put500data', async () => updateData(500));
app.put('/put1000data', async () => updateData(1000));

app.put('/:id', async ({ params }) => {
  const id = params.id;
  const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;
  const [results] = await connection.query(sql, ['zorro', 24, id]);

  if (results.affectedRows === 0) {
    return { message: "User not found" };
  }

  return { message: "Data updated successfully" };
});

const deleteData = async (limit) => {
  const sql = `DELETE FROM users LIMIT ?`;
  await connection.query(sql, [limit]);
  return { message: "Data deleted successfully" };
};

app.delete('/delete10data', async () => deleteData(10));
app.delete('/delete100data', async () => deleteData(100));
app.delete('/delete500data', async () => deleteData(500));
app.delete('/delete1000data', async () => deleteData(1000));

app.delete('/', async () => deleteData(10000));

app.listen(port, () => {
  console.log(`Server berjalan di port http://localhost:${port}`);
});
