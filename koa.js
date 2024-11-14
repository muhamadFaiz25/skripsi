const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql');

const app = new Koa();
const router = new Router();

const port = 3002;

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

app.use(bodyParser());

router.post('/post10data', async (ctx) => {
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

        ctx.status = 201;
        ctx.body = { message: "Data created successfully" };
    } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.body = { message: "Error creating user" };
    }
});

router.post('/post100data', async (ctx) => {
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

        ctx.status = 201;
        ctx.body = { message: "Data created successfully" };
    } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.body = { message: "Error creating user" };
    }
});

router.post('/post500data', async (ctx) => {
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

        ctx.status = 201;
        ctx.body = { message: "Data created successfully" };
    } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.body = { message: "Error creating user" };
    }
});

router.post('/post1000data', async (ctx) => {
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

        ctx.status = 201;
        ctx.body = { message: "Data created successfully" };
    } catch (err) {
        console.error(err);
        ctx.status = 400;
        ctx.body = { message: "Error creating user" };
    }
});

router.get('/', (ctx) => {
    ctx.body = 'hello world';
});

router.get('/get10data', async (ctx) => {
    const sql = "SELECT * FROM users LIMIT 10";

    await new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                ctx.body = results;
                resolve();
            }
        });
    });
});

router.get('/get100data', async (ctx) => {
    const sql = "SELECT * FROM users LIMIT 100";

    await new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                ctx.body = results;
                resolve();
            }
        });
    });
});

router.get('/get500data', async (ctx) => {
    const sql = "SELECT * FROM users LIMIT 500";

    await new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                ctx.body = results;
                resolve();
            }
        });
    });
});

router.get('/get1000data', async (ctx) => {
    const sql = "SELECT * FROM users LIMIT 1000";

    await new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                ctx.body = results;
                resolve();
            }
        });
    });
});

router.get('/getdata', async (ctx) => {
    const sql = "SELECT * FROM users";

    await new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                ctx.body = results;
                resolve();
            }
        });
    });
});

router.put('/put10data', async (ctx) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 10";
    await new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    ctx.status = 404;
                    ctx.body = { message: "No users found" };
                    reject();
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        ctx.status = 500;
                        ctx.body = { message: "Error updating data" };
                        reject(err);
                    } else {
                        ctx.body = { message: "Data updated successfully" };
                        resolve();
                    }
                });
            }
        });
    });
});

router.put('/put100data', async (ctx) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 100";
    await new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    ctx.status = 404;
                    ctx.body = { message: "No users found" };
                    reject();
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        ctx.status = 500;
                        ctx.body = { message: "Error updating data" };
                        reject(err);
                    } else {
                        ctx.body = { message: "Data updated successfully" };
                        resolve();
                    }
                });
            }
        });
    });
});

router.put('/put500data', async (ctx) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 500";
    await new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    ctx.status = 404;
                    ctx.body = { message: "No users found" };
                    reject();
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        ctx.status = 500;
                        ctx.body = { message: "Error updating data" };
                        reject(err);
                    } else {
                        ctx.body = { message: "Data updated successfully" };
                        resolve();
                    }
                });
            }
        });
    });
});

router.put('/put1000data', async (ctx) => {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 1000";
    await new Promise((resolve, reject) => {
        connection.query(sqlSelect, (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error fetching data" };
                reject(err);
            } else {
                const ids = results.map(result => result.id);
                if (ids.length === 0) {
                    ctx.status = 404;
                    ctx.body = { message: "No users found" };
                    reject();
                }

                const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
                connection.query(sqlUpdate, [newName, newAge], (err) => {
                    if (err) {
                        console.error(err);
                        ctx.status = 500;
                        ctx.body = { message: "Error updating data" };
                        reject(err);
                    } else {
                        ctx.body = { message: "Data updated successfully" };
                        resolve();
                    }
                });
            }
        });
    });
});

router.put('/:id', async (ctx) => {
    const id = ctx.params.id;
    const name = 'zorro';
    const age = 24;

    const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;

    await new Promise((resolve, reject) => {
        connection.query(sql, [name, age, id], (err, results) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error updating data" };
                reject(err);
            } else if (results.affectedRows === 0) {
                ctx.status = 404;
                ctx.body = { message: "User not found" };
                reject();
            } else {
                ctx.body = { message: "Data updated successfully" };
                resolve();
            }
        });
    });
});

router.delete('/delete1000data', async (ctx) => {
    const sql = `DELETE FROM users`;

    await new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error deleting data" };
                reject(err);
            } else {
                ctx.body = { message: "Data deleted successfully" };
                resolve();
            }
        });
    });
});

router.delete('/delete500data', async (ctx) => {
    const sql = `DELETE FROM users`;

    await new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error deleting data" };
                reject(err);
            } else {
                ctx.body = { message: "Data deleted successfully" };
                resolve();
            }
        });
    });
});

router.delete('/delete100data', async (ctx) => {
    const sql = `DELETE FROM users`;

    await new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error deleting data" };
                reject(err);
            } else {
                ctx.body = { message: "Data deleted successfully" };
                resolve();
            }
        });
    });
});

router.delete('/delete10data', async (ctx) => {
    const sql = `DELETE FROM users`;

    await new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error deleting data" };
                reject(err);
            } else {
                ctx.body = { message: "Data deleted successfully" };
                resolve();
            }
        });
    });
});

router.delete('/', async (ctx) => {
    const sql = `DELETE FROM users`;

    await new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.error(err);
                ctx.status = 500;
                ctx.body = { message: "Error deleting data" };
                reject(err);
            } else {
                ctx.body = { message: "Data deleted successfully" };
                resolve();
            }
        });
    });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
