const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql2/promise');

const app = new Koa();
const router = new Router();

const port = 3002;

// Set up a connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "testing",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(bodyParser());

// Helper function to insert bulk data
async function insertBulkData(numRecords) {
    const connection = await pool.getConnection();
    try {
        const bulkData = Array.from({ length: numRecords }, (_, i) => [
            i + 1,
            "luffy",
            Math.floor(Math.random() * 80)
        ]);

        const sql = "INSERT IGNORE INTO users (id, name, age) VALUES ?";
        await connection.query(sql, [bulkData]);
    } finally {
        connection.release();
    }
}

// Endpoints for different batch sizes
router.post('/post10data', async (ctx) => {
    await insertBulkData(10);
    ctx.status = 201;
    ctx.body = { message: "10 records created successfully" };
});

router.post('/post100data', async (ctx) => {
    await insertBulkData(100);
    ctx.status = 201;
    ctx.body = { message: "100 records created successfully" };
});

router.post('/post500data', async (ctx) => {
    await insertBulkData(500);
    ctx.status = 201;
    ctx.body = { message: "500 records created successfully" };
});

router.post('/post1000data', async (ctx) => {
    await insertBulkData(1000);
    ctx.status = 201;
    ctx.body = { message: "1000 records created successfully" };
});

// Generic fetch function
async function fetchData(limit) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query("SELECT * FROM users LIMIT ?", [limit]);
        return results;
    } finally {
        connection.release();
    }
}

// GET endpoints
router.get('/get10data', async (ctx) => {
    ctx.body = await fetchData(10);
});

router.get('/get100data', async (ctx) => {
    ctx.body = await fetchData(100);
});

router.get('/get500data', async (ctx) => {
    ctx.body = await fetchData(500);
});

router.get('/get1000data', async (ctx) => {
    ctx.body = await fetchData(1000);
});

router.get('/getdata', async (ctx) => {
    ctx.body = await fetchData(Number.MAX_SAFE_INTEGER);
});

// Function to update data in bulk
async function updateBulkData(limit, newName, newAge) {
    const connection = await pool.getConnection();
    try {
        const [ids] = await connection.query("SELECT id FROM users LIMIT ?", [limit]);
        if (ids.length === 0) return;

        const idList = ids.map(row => row.id);
        const sql = `UPDATE users SET name = ?, age = ? WHERE id IN (${idList.join(",")})`;
        await connection.query(sql, [newName, newAge]);
    } finally {
        connection.release();
    }
}

// PUT endpoints
router.put('/put10data', async (ctx) => {
    await updateBulkData(10, "zorro", 24);
    ctx.body = { message: "10 records updated successfully" };
});

router.put('/put100data', async (ctx) => {
    await updateBulkData(100, "zorro", 24);
    ctx.body = { message: "100 records updated successfully" };
});

router.put('/put500data', async (ctx) => {
    await updateBulkData(500, "zorro", 24);
    ctx.body = { message: "500 records updated successfully" };
});

router.put('/put1000data', async (ctx) => {
    await updateBulkData(1000, "zorro", 24);
    ctx.body = { message: "1000 records updated successfully" };
});

// Update single record by ID
router.put('/:id', async (ctx) => {
    const id = ctx.params.id;
    const name = "zorro";
    const age = 24;
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query("UPDATE users SET name = ?, age = ? WHERE id = ?", [name, age, id]);
        ctx.body = result.affectedRows > 0 ? { message: "Record updated successfully" } : { message: "User not found" };
    } finally {
        connection.release();
    }
});

// DELETE endpoint
router.delete('/delete1000data', async (ctx) => {
    const connection = await pool.getConnection();
    try {
        await connection.query("DELETE FROM users");
        ctx.body = { message: "All records deleted successfully" };
    } finally {
        connection.release();
    }
});

// Start the Koa app
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
