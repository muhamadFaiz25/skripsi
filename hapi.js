const Hapi = require('@hapi/hapi');
const mysql = require('mysql');
const { promisify } = require('util');

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
    });

    const dbConfig = {
        host: "localhost",
        user: "root",
        password: "",
        database: "testing",
    };

    const pool = mysql.createPool(dbConfig);
    pool.query = promisify(pool.query);  // Membuat `query` dapat digunakan sebagai Promise

    const bulkInsertData = async (limit) => {
        const data = Array.from({ length: limit }, (_, i) => [
            i + 1,
            'luffy',
            Math.floor(Math.random() * 80),
        ]);

        const sql = `INSERT IGNORE INTO users (id, name, age) VALUES ?`;
        await pool.query(sql, [data]);
    };

    server.route([
        {
            method: 'POST',
            path: '/post{count}data',
            handler: async (request, h) => {
                const count = parseInt(request.params.count);
                if (![10, 100, 500, 1000].includes(count)) {
                    return h.response({ message: "Invalid data count" }).code(400);
                }
                
                await bulkInsertData(count);
                return h.response({ message: `Data created successfully (${count} records)` }).code(201);
            },
        },
        {
            method: 'GET',
            path: '/get{count}data',
            handler: async (request, h) => {
                const count = parseInt(request.params.count);
                if (![10, 100, 500, 1000].includes(count)) {
                    return h.response({ message: "Invalid data count" }).code(400);
                }

                const sql = `SELECT * FROM users LIMIT ?`;
                const results = await pool.query(sql, [count]);
                return results;
            },
        },
        {
            method: 'PUT',
            path: '/put{count}data',
            handler: async (request, h) => {
                const count = parseInt(request.params.count);
                if (![10, 100, 500, 1000].includes(count)) {
                    return h.response({ message: "Invalid data count" }).code(400);
                }

                const sqlSelect = `SELECT id FROM users LIMIT ?`;
                const results = await pool.query(sqlSelect, [count]);
                const ids = results.map(row => row.id);
                if (ids.length === 0) return h.response({ message: "No users found" }).code(404);

                const sqlUpdate = `UPDATE users SET name = 'zorro', age = 24 WHERE id IN (${ids.join(',')})`;
                await pool.query(sqlUpdate);

                return { message: `Data updated successfully (${count} records)` };
            },
        },
        {
            method: 'DELETE',
            path: '/delete{count}data',
            handler: async (request, h) => {
                const count = parseInt(request.params.count);
                if (![10, 100, 500, 1000].includes(count)) {
                    return h.response({ message: "Invalid data count" }).code(400);
                }

                const sql = `DELETE FROM users LIMIT ?`;
                await pool.query(sql, [count]);

                return { message: `Data deleted successfully (${count} records)` };
            },
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
