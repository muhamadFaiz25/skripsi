const { exec, spawn } = require('child_process');
const ExcelJS = require('exceljs');

let serverProcess;

// Fungsi untuk menjalankan Apache Benchmark dan mengembalikan hasilnya sebagai Promise
function runAbTest(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`exec error: ${error}`);
                return;
            }
            resolve(stdout);
        });
    });
}

// Pola regex untuk menangkap metrik penting
const patterns = {
    'Time taken for tests': /Time taken for tests:\s+([\d.]+) seconds/,
    'Requests per second': /Requests per second:\s+([\d.]+) \[#\/sec\] \(mean\)/,
    'Time per request': /Time per request:\s+([\d.]+) \[ms\] \(mean\)/,
    'Transfer rate': /Transfer rate:\s+([\d.]+) \[Kbytes\/sec\] received/
};

// URL untuk setiap framework dan method
const urlMap = {
    Express: {
        POST: 'http://localhost:3000/post10data',
        GET: 'http://localhost:3000/get10data',
        PUT: 'http://localhost:3000/put10data',
        DELETE: 'http://localhost:3000/delete10data'
    },
    Hapi: {
        POST: 'http://localhost:3001/post10data',
        GET: 'http://localhost:3001/get10data',
        PUT: 'http://localhost:3001/put10data',
        DELETE: 'http://localhost:3001/delete10data'
    },
    Koa: {
        POST: 'http://localhost:3002/post10data',
        GET: 'http://localhost:3002/get10data',
        PUT: 'http://localhost:3002/put10data',
        DELETE: 'http://localhost:3002/delete10data'
    },
    Nest: {
        POST: 'http://localhost:3003/post10data',
        GET: 'http://localhost:3003/get10data',
        PUT: 'http://localhost:3003/put10data',
        DELETE: 'http://localhost:3003/delete10data'
    },
    Elysia: {
        POST: 'http://localhost:3004/post10data',
        GET: 'http://localhost:3004/get10data',
        PUT: 'http://localhost:3004/put10data',
        DELETE: 'http://localhost:3004/delete10data'
    },
    Fastify: {
        POST: 'http://localhost:3005/post10data',
        GET: 'http://localhost:3005/get10data',
        PUT: 'http://localhost:3005/put10data',
        DELETE: 'http://localhost:3005/delete10data'
    }
};

// variabel untuk ubah nilai n dan concurrency
const numRequests = 50;
const concurrencyLevel = 50;

// List untuk menyimpan hasil dari setiap iterasi
const allResults = [];

// Map file server ke framework
const serverFiles = {
    Express: 'express.js',
    Hapi: 'hapi.js',
    Koa: 'koa.js',
    Nest: 'nest.ts',
    Elysia: 'elysia.ts',
    Fastify: 'fastify.js'
};

async function startServer(framework) {
    return new Promise((resolve, reject) => {
        const serverFile = serverFiles[framework];
        const command = serverFile.endsWith('.ts') ? 'bun' : 'bun';
        serverProcess = spawn(command, [serverFile]);
        serverProcess.stdout.on('data', data => console.log(`stdout: ${data}`));
        serverProcess.stderr.on('data', data => console.error(`stderr: ${data}`));
        serverProcess.on('close', code => {
            console.log(`Server process exited with code ${code}`);
            reject(new Error(`Server process exited with code ${code}`));
        });
        setTimeout(resolve, 5000); // Wait for 5 seconds to ensure the server starts properly
    });
}

async function stopServer() {
    return new Promise((resolve, reject) => {
        if (serverProcess) {
            exec(`taskkill /PID ${serverProcess.pid} /F`, (error, stdout, stderr) => {
                if (error) {
                    reject(`taskkill error: ${error}`);
                    return;
                }
                console.log(`Server stopped successfully`);
                resolve();
            });
        } else {
            resolve();
        }
    });
}

async function main() {
    for (const [framework, methods] of Object.entries(urlMap)) {
        for (const [method, url] of Object.entries(methods)) {
            // ubah nilai i untuk merubah berapa kali pengujiannya
            for (let i = 0; i < 2; i++) {
                console.log(`Menjalankan pengujian ${method} untuk ${framework} ke-${i + 1}...`);
                
                await stopServer();
                await startServer(framework);

                let command;
                if (method === 'GET') {
                    command = `ab -c ${concurrencyLevel} -n ${numRequests} ${url}`;
                } else {
                    command = `ab -m ${method} -c ${concurrencyLevel} -n ${numRequests} ${url}`;
                }
                try {
                    const data = await runAbTest(command);
                    const results = { Framework: framework, Method: method, 'Test Number': i + 1 };

                    for (const [key, pattern] of Object.entries(patterns)) {
                        const match = pattern.exec(data);
                        if (match) {
                            results[key] = match[1];
                        }
                    }

                    allResults.push(results);
                    
                } catch (error) {
                    console.error(`Gagal menguji ${method} untuk ${framework} ke-${i + 1}`);
                }
            }
        }
    }

    // Membuat workbook dan worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Benchmark Results');

    // Menambahkan header
    worksheet.columns = [
        { header: 'Framework', key: 'Framework' },
        { header: 'Method', key: 'Method' },
        { header: 'Test Number', key: 'Test Number' },
        ...Object.keys(patterns).map(key => ({ header: key, key: key }))
    ];

    // Menambahkan data
    allResults.forEach(result => {
        worksheet.addRow(result);
    });

    // Menyimpan workbook ke file
    await workbook.xlsx.writeFile('benchmark_results.xlsx');
    console.log('Hasil telah disimpan');
}

main();
