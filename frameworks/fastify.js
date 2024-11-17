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

const insertBatchData = async (count) => {
    const values = [];
    for (let i = 1; i <= count; i++) {
        values.push([i, "luffy", Math.floor(Math.random() * 80)]);
    }

    const sql = "INSERT IGNORE INTO users (id, name, age) VALUES ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [values], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

const getUsersData = async (limit) => {
    const sql = `SELECT * FROM users LIMIT ?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [limit], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const updateUsersData = async (limit, name, age) => {
    const sqlSelect = `SELECT id FROM users LIMIT ?`;
    const ids = await new Promise((resolve, reject) => {
        connection.query(sqlSelect, [limit], (err, results) => {
            if (err) reject(err);
            resolve(results.map(result => result.id));
        });
    });

    if (ids.length === 0) throw new Error('No users found');

    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (?)`;
    return new Promise((resolve, reject) => {
        connection.query(sqlUpdate, [name, age, ids], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

const deleteUsersData = async () => {
    const sql = "DELETE FROM users";
    return new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

fastify.post('/post10data', async (request, reply) => {
    try {
        await insertBatchData(10);
        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.post('/post100data', async (request, reply) => {
    try {
        await insertBatchData(100);
        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.post('/post500data', async (request, reply) => {
    try {
        await insertBatchData(500);
        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.post('/post1000data', async (request, reply) => {
    try {
        await insertBatchData(1000);
        reply.code(201).send({ message: "Data created successfully" });
    } catch (err) {
        console.error(err);
        reply.code(400).send({ message: "Error creating user" });
    }
});

fastify.get('/get10data', async (request, reply) => {
    try {
        const data = await getUsersData(10);
        reply.send(data);
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error fetching data" });
    }
});

fastify.get('/get100data', async (request, reply) => {
    try {
        const data = await getUsersData(100);
        reply.send(data);
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error fetching data" });
    }
});

fastify.get('/get500data', async (request, reply) => {
    try {
        const data = await getUsersData(500);
        reply.send(data);
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error fetching data" });
    }
});

fastify.get('/get1000data', async (request, reply) => {
    try {
        const data = await getUsersData(1000);
        reply.send(data);
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error fetching data" });
    }
});

fastify.get('/getdata', async (request, reply) => {
    try {
        const data = await getUsersData(10000);
        reply.send(data);
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error fetching data" });
    }
});

fastify.put('/put10data', async (request, reply) => {
    try {
        await updateUsersData(10, 'zorro', 24);
        reply.send({ message: "Data updated successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error updating data" });
    }
});

fastify.put('/put100data', async (request, reply) => {
    try {
        await updateUsersData(100, 'zorro', 24);
        reply.send({ message: "Data updated successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error updating data" });
    }
});

fastify.put('/put500data', async (request, reply) => {
    try {
        await updateUsersData(500, 'zorro', 24);
        reply.send({ message: "Data updated successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error updating data" });
    }
});

fastify.put('/put1000data', async (request, reply) => {
    try {
        await updateUsersData(1000, 'zorro', 24);
        reply.send({ message: "Data updated successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error updating data" });
    }
});

fastify.put('/:id', async (request, reply) => {
    const id = request.params.id;
    try {
        await updateUsersData(1, 'zorro', 24); // Update one user by ID
        reply.send({ message: "Data updated successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error updating data" });
    }
});

fastify.delete('/delete10data', async (request, reply) => {
    try {
        await deleteUsersData();
        reply.send({ message: "Data deleted successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error deleting data" });
    }
});

fastify.delete('/delete100data', async (request, reply) => {
    try {
        await deleteUsersData();
        reply.send({ message: "Data deleted successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error deleting data" });
    }
});

fastify.delete('/delete500data', async (request, reply) => {
    try {
        await deleteUsersData();
        reply.send({ message: "Data deleted successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error deleting data" });
    }
});

fastify.delete('/delete1000data', async (request, reply) => {
    try {
        await deleteUsersData();
        reply.send({ message: "Data deleted successfully" });
    } catch (err) {
        console.error(err);
        reply.code(500).send({ message: "Error deleting data" });
    }
});

fastify.listen(port, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
