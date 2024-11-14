const Hapi = require('@hapi/hapi');
const mysql = require('mysql');

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

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

    server.route({
        method: 'POST',
        path: '/post10data',
        handler: async (request, h) => {
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

                return h.response({ message: "Data created successfully" }).code(201);
            } catch (err) {
                console.error(err);
                return h.response({ message: "Error creating user" }).code(400);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/post100data',
        handler: async (request, h) => {
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

                return h.response({ message: "Data created successfully" }).code(201);
            } catch (err) {
                console.error(err);
                return h.response({ message: "Error creating user" }).code(400);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/post500data',
        handler: async (request, h) => {
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

                return h.response({ message: "Data created successfully" }).code(201);
            } catch (err) {
                console.error(err);
                return h.response({ message: "Error creating user" }).code(400);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/post1000data',
        handler: async (request, h) => {
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

                return h.response({ message: "Data created successfully" }).code(201);
            } catch (err) {
                console.error(err);
                return h.response({ message: "Error creating user" }).code(400);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'hello world';
        }
    });

    server.route({
        method: 'GET',
        path: '/get10data',
        handler: (request, h) => {
            const sql = "SELECT * FROM users LIMIT 10";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    resolve(results);
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/get100data',
        handler: (request, h) => {
            const sql = "SELECT * FROM users LIMIT 100";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    resolve(results);
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/get500data',
        handler: (request, h) => {
            const sql = "SELECT * FROM users LIMIT 500";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    resolve(results);
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/get1000data',
        handler: (request, h) => {
            const sql = "SELECT * FROM users LIMIT 1000";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    resolve(results);
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/getdata',
        handler: (request, h) => {
            const sql = "SELECT * FROM users";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    resolve(results);
                });
            });
        }
    });

    server.route({
        method: 'PUT',
        path: '/put10data',
        handler: (request, h) => {
            const newName = 'zorro';
            const newAge = 24;

            const sqlSelect = "SELECT id FROM users LIMIT 10";
            return new Promise((resolve, reject) => {
                connection.query(sqlSelect, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    const ids = results.map(result => result.id);
                    if (ids.length === 0) {
                        return reject(h.response({ message: "No users found" }).code(404));
                    }

                    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
                        if (err) {
                            console.error(err);
                            return reject(h.response({ message: "Error updating data" }).code(500));
                        }

                        resolve({ message: "Data updated successfully" });
                    });
                });
            });
        }
    });

    server.route({
        method: 'PUT',
        path: '/put100data',
        handler: (request, h) => {
            const newName = 'zorro';
            const newAge = 24;

            const sqlSelect = "SELECT id FROM users LIMIT 100";
            return new Promise((resolve, reject) => {
                connection.query(sqlSelect, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    const ids = results.map(result => result.id);
                    if (ids.length === 0) {
                        return reject(h.response({ message: "No users found" }).code(404));
                    }

                    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
                        if (err) {
                            console.error(err);
                            return reject(h.response({ message: "Error updating data" }).code(500));
                        }

                        resolve({ message: "Data updated successfully" });
                    });
                });
            });
        }
    });

    server.route({
        method: 'PUT',
        path: '/put500data',
        handler: (request, h) => {
            const newName = 'zorro';
            const newAge = 24;

            const sqlSelect = "SELECT id FROM users LIMIT 500";
            return new Promise((resolve, reject) => {
                connection.query(sqlSelect, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    const ids = results.map(result => result.id);
                    if (ids.length === 0) {
                        return reject(h.response({ message: "No users found" }).code(404));
                    }

                    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
                        if (err) {
                            console.error(err);
                            return reject(h.response({ message: "Error updating data" }).code(500));
                        }

                        resolve({ message: "Data updated successfully" });
                    });
                });
            });
        }
    });

    server.route({
        method: 'PUT',
        path: '/put1000data',
        handler: (request, h) => {
            const newName = 'zorro';
            const newAge = 24;

            const sqlSelect = "SELECT id FROM users LIMIT 1000";
            return new Promise((resolve, reject) => {
                connection.query(sqlSelect, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error fetching data" }).code(500));
                    }

                    const ids = results.map(result => result.id);
                    if (ids.length === 0) {
                        return reject(h.response({ message: "No users found" }).code(404));
                    }

                    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                    connection.query(sqlUpdate, [newName, newAge], (err, results) => {
                        if (err) {
                            console.error(err);
                            return reject(h.response({ message: "Error updating data" }).code(500));
                        }

                        resolve({ message: "Data updated successfully" });
                    });
                });
            });
        }
    });

    server.route({
        method: 'PUT',
        path: '/{id}',
        handler: (request, h) => {
            const id = request.params.id;
            const name = 'zorro';
            const age = 24;

            const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;

            return new Promise((resolve, reject) => {
                connection.query(sql, [name, age, id], (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error updating data" }).code(500));
                    }

                    if (results.affectedRows === 0) {
                        return reject(h.response({ message: "User not found" }).code(404));
                    }

                    resolve({ message: "Data updated successfully" });
                });
            });
        }
    });

    server.route({
        method: 'DELETE',
        path: '/delete10data',
        handler: (request, h) => {
            const sql = `DELETE FROM users`;

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error deleting data" }).code(500));
                    }

                    resolve({ message: "Data deleted successfully" });
                });
            });
        }
    });

    server.route({
        method: 'DELETE',
        path: '/delete100data',
        handler: (request, h) => {
            const sql = `DELETE FROM users`;

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error deleting data" }).code(500));
                    }

                    resolve({ message: "Data deleted successfully" });
                });
            });
        }
    });

    server.route({
        method: 'DELETE',
        path: '/delete500data',
        handler: (request, h) => {
            const sql = `DELETE FROM users`;

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error deleting data" }).code(500));
                    }

                    resolve({ message: "Data deleted successfully" });
                });
            });
        }
    });

    server.route({
        method: 'DELETE',
        path: '/delete1000data',
        handler: (request, h) => {
            const sql = `DELETE FROM users`;

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error deleting data" }).code(500));
                    }

                    resolve({ message: "Data deleted successfully" });
                });
            });
        }
    });

    server.route({
        method: 'DELETE',
        path: '/',
        handler: (request, h) => {
            const sql = `DELETE FROM users`;

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(h.response({ message: "Error deleting data" }).code(500));
                    }

                    resolve({ message: "Data deleted successfully" });
                });
            });
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
