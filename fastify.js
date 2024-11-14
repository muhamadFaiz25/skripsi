const Fastify = require('fastify');
const mysql = require('mysql');

const port = 3005;

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

const fastify = Fastify();

fastify.post('/post10data', async (request, reply) => {
    try {
        for (let i = 1; i <= 10; i++) {
            const data = {
                id: i,
                name: "luffy",
                age: Math.floor(Math.random() * 80),
            };

            const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

            connection.query(sql, [data.id, data.name, data.age], (err) => {
                if (err) throw err;
            });
        }

        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.post('/post100data', async (request, reply) => {
    try {
        for (let i = 1; i <= 100; i++) {
            const data = {
                id: i,
                name: "luffy",
                age: Math.floor(Math.random() * 80),
            };

            const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

            connection.query(sql, [data.id, data.name, data.age], (err) => {
                if (err) throw err;
            });
        }

        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.post('/post500data', async (request, reply) => {
    try {
        for (let i = 1; i <= 500; i++) {
            const data = {
                id: i,
                name: "luffy",
                age: Math.floor(Math.random() * 80),
            };

            const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

            connection.query(sql, [data.id, data.name, data.age], (err) => {
                if (err) throw err;
            });
        }

        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.post('/post1000data', async (request, reply) => {
    try {
        for (let i = 1; i <= 1000; i++) {
            const data = {
                id: i,
                name: "luffy",
                age: Math.floor(Math.random() * 80),
            };

            const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

            connection.query(sql, [data.id, data.name, data.age], (err) => {
                if (err) throw err;
            });
        }

        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.get('/', async (request, reply) => {
    return 'hello world';
});

fastify.get('/get10data', async (request, reply) => {
    const sql = "SELECT * FROM users LIMIT 10";

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
});

fastify.get('/get100data', async (request, reply) => {
    const sql = "SELECT * FROM users LIMIT 100";

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
});

fastify.get('/get500data', async (request, reply) => {
    const sql = "SELECT * FROM users LIMIT 500";

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
});

fastify.get('/get1000data', async (request, reply) => {
    const sql = "SELECT * FROM users LIMIT 1000";

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
});

fastify.get('/getdata', async (request, reply) => {
    const sql = "SELECT * FROM users";

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
});

fastify.put('/put10data', async (request, reply) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 10";
    return new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    reply.code(404).send({ message: "No users found" });
                    reject(new Error("No users found"));
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        reply.code(500).send({ message: "Error updating data" });
                        reject(err);
                    } else {
                        resolve({ message: "Data updated successfully" });
                    }
                });
            }
        });
    });
});

fastify.put('/put100data', async (request, reply) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 100";
    return new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    reply.code(404).send({ message: "No users found" });
                    reject(new Error("No users found"));
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        reply.code(500).send({ message: "Error updating data" });
                        reject(err);
                    } else {
                        resolve({ message: "Data updated successfully" });
                    }
                });
            }
        });
    });
});

fastify.put('/put500data', async (request, reply) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 500";
    return new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    reply.code(404).send({ message: "No users found" });
                    reject(new Error("No users found"));
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        reply.code(500).send({ message: "Error updating data" });
                        reject(err);
                    } else {
                        resolve({ message: "Data updated successfully" });
                    }
                });
            }
        });
    });
});

fastify.put('/put1000data', async (request, reply) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 1000";
    return new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error fetching data" });
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    reply.code(404).send({ message: "No users found" });
                    reject(new Error("No users found"));
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        reply.code(500).send({ message: "Error updating data" });
                        reject(err);
                    } else {
                        resolve({ message: "Data updated successfully" });
                    }
                });
            }
        });
    });
});

fastify.put('/:id', async (request, reply) => {
    const id = request.params.id;
    const name = 'zorro';
    const age = 24;

    const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        connection.query(sql, [name, age, id], (err, results) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error updating data" });
                reject(err);
            } else if (results.affectedRows === 0) {
                reply.code(404).send({ message: "User not found" });
                reject(new Error("User not found"));
            } else {
                resolve({ message: "Data updated successfully" });
            }
        });
    });
});

fastify.delete('/delete10data', async (request, reply) => {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error deleting data" });
                reject(err);
            } else {
                resolve({ message: "Data deleted successfully" });
            }
        });
    });
});

fastify.delete('/delete100data', async (request, reply) => {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error deleting data" });
                reject(err);
            } else {
                resolve({ message: "Data deleted successfully" });
            }
        });
    });
});

fastify.delete('/delete500data', async (request, reply) => {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error deleting data" });
                reject(err);
            } else {
                resolve({ message: "Data deleted successfully" });
            }
        });
    });
});

fastify.delete('/delete1000data', async (request, reply) => {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error deleting data" });
                reject(err);
            } else {
                resolve({ message: "Data deleted successfully" });
            }
        });
    });
});

fastify.delete('/', async (request, reply) => {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                reply.code(500).send({ message: "Error deleting data" });
                reject(err);
            } else {
                resolve({ message: "Data deleted successfully" });
            }
        });
    });
});

fastify.listen({ port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running on ${address}`);
});
