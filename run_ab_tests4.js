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
        POST: {
            10: 'http://localhost:3000/post10data',
            100: 'http://localhost:3000/post100data',
            500: 'http://localhost:3000/post500data',
            1000: 'http://localhost:3000/post1000data'
        },
        GET: {
            10: 'http://localhost:3000/get10data',
            100: 'http://localhost:3000/get100data',
            500: 'http://localhost:3000/get500data',
            1000: 'http://localhost:3000/get1000data'
        },
        PUT: {
            10: 'http://localhost:3000/put10data',
            100: 'http://localhost:3000/put100data',
            500: 'http://localhost:3000/put500data',
            1000: 'http://localhost:3000/put1000data'
        },
        DELETE: {
            10: 'http://localhost:3000/delete10data',
            100: 'http://localhost:3000/delete100data',
            500: 'http://localhost:3000/delete500data',
            1000: 'http://localhost:3000/delete1000data'
        }
    },
    Hapi: {
        POST: {
            10: 'http://localhost:3001/post10data',
            100: 'http://localhost:3001/post100data',
            500: 'http://localhost:3001/post500data',
            1000: 'http://localhost:3001/post1000data'
        },
        GET: {
            10: 'http://localhost:3001/get10data',
            100: 'http://localhost:3001/get100data',
            500: 'http://localhost:3001/get500data',
            1000: 'http://localhost:3001/get1000data'
        },
        PUT: {
            10: 'http://localhost:3001/put10data',
            100: 'http://localhost:3001/put100data',
            500: 'http://localhost:3001/put500data',
            1000: 'http://localhost:3001/put1000data'
        },
        DELETE: {
            10: 'http://localhost:3001/delete10data',
            100: 'http://localhost:3001/delete100data',
            500: 'http://localhost:3001/delete500data',
            1000: 'http://localhost:3001/delete1000data'
        }
    },
    Koa: {
        POST: {
            10: 'http://localhost:3002/post10data',
            100: 'http://localhost:3002/post100data',
            500: 'http://localhost:3002/post500data',
            1000: 'http://localhost:3002/post1000data'
        },
        GET: {
            10: 'http://localhost:3002/get10data',
            100: 'http://localhost:3002/get100data',
            500: 'http://localhost:3002/get500data',
            1000: 'http://localhost:3002/get1000data'
        },
        PUT: {
            10: 'http://localhost:3002/put10data',
            100: 'http://localhost:3002/put100data',
            500: 'http://localhost:3002/put500data',
            1000: 'http://localhost:3002/put1000data'
        },
        DELETE: {
            10: 'http://localhost:3002/delete10data',
            100: 'http://localhost:3002/delete100data',
            500: 'http://localhost:3002/delete500data',
            1000: 'http://localhost:3002/delete1000data'
        }
    },
    Nest: {
        POST: {
            10: 'http://localhost:3003/post10data',
            100: 'http://localhost:3003/post100data',
            500: 'http://localhost:3003/post500data',
            1000: 'http://localhost:3003/post1000data'
        },
        GET: {
            10: 'http://localhost:3003/get10data',
            100: 'http://localhost:3003/get100data',
            500: 'http://localhost:3003/get500data',
            1000: 'http://localhost:3003/get1000data'
        },
        PUT: {
            10: 'http://localhost:3003/put10data',
            100: 'http://localhost:3003/put100data',
            500: 'http://localhost:3003/put500data',
            1000: 'http://localhost:3003/put1000data'
        },
        DELETE: {
            10: 'http://localhost:3003/delete10data',
            100: 'http://localhost:3003/delete100data',
            500: 'http://localhost:3003/delete500data',
            1000: 'http://localhost:3003/delete1000data'
        }
    },
    Elysia: {
        POST: {
            10: 'http://localhost:3004/post10data',
            100: 'http://localhost:3004/post100data',
            500: 'http://localhost:3004/post500data',
            1000: 'http://localhost:3004/post1000data'
        },
        GET: {
            10: 'http://localhost:3004/get10data',
            100: 'http://localhost:3004/get100data',
            500: 'http://localhost:3004/get500data',
            1000: 'http://localhost:3004/get1000data'
        },
        PUT: {
            10: 'http://localhost:3004/put10data',
            100: 'http://localhost:3004/put100data',
            500: 'http://localhost:3004/put500data',
            1000: 'http://localhost:3004/put1000data'
        },
        DELETE: {
            10: 'http://localhost:3004/delete10data',
            100: 'http://localhost:3004/delete100data',
            500: 'http://localhost:3004/delete500data',
            1000: 'http://localhost:3004/delete1000data'
        }
    },
    Fastify: {
        POST: {
            10: 'http://localhost:3005/post10data',
            100: 'http://localhost:3005/post100data',
            500: 'http://localhost:3005/post500data',
            1000: 'http://localhost:3005/post1000data'
        },
        GET: {
            10: 'http://localhost:3005/get10data',
            100: 'http://localhost:3005/get100data',
            500: 'http://localhost:3005/get500data',
            1000: 'http://localhost:3005/get1000data'
        },
        PUT: {
            10: 'http://localhost:3005/put10data',
            100: 'http://localhost:3005/put100data',
            500: 'http://localhost:3005/put500data',
            1000: 'http://localhost:3005/put1000data'
        },
        DELETE: {
            10: 'http://localhost:3005/delete10data',
            100: 'http://localhost:3005/delete100data',
            500: 'http://localhost:3005/delete500data',
            1000: 'http://localhost:3005/delete1000data'
        }
    }
};

const numRequestsList = [60,500,5000,10000];
const dataCounts = [10,100,500,1000];
const concurrencyLevel = 50;
const allResults = [];
const serverFiles = {
    Express: './frameworks/express.js',
    Hapi: './frameworks/hapi.js',
    Koa: './frameworks/koa.js',
    Nest: './frameworks/nest.ts',
    Elysia: './frameworks/elysia.ts',
    Fastify: './frameworks/fastify.js'
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
        setTimeout(resolve, 10000); // Tunggu 5 detik agar server dapat berjalan dengan baik
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

// Fungsi utama untuk menjalankan pengujian
async function runTests() {
    const averages = {}; // Object untuk menyimpan total hasil untuk rata-rata

    for (const framework in urlMap) {
        for (const dataCount of dataCounts) {
            for (const numRequests of numRequestsList) {
                for (const method of ['POST', 'GET', 'PUT', 'DELETE']) {
                    const url = urlMap[framework][method][dataCount];
                    console.log(`\nRunning ${method} test for ${framework} with dataCount = ${dataCount}, numRequests = ${numRequests}...\n`);

                    await stopServer(); // Stop server before test
                    await startServer(framework); // Start server for the test

                    // Key untuk menyimpan hasil total tiap kombinasi
                    const key = `${framework}-${method}-${dataCount}-${numRequests}`;
                    averages[key] = {
                        'Time taken for tests': 0,
                        'Requests per second': 0,
                        'Time per request': 0,
                        'Transfer rate': 0
                    };

                    // Run each method test 10 times
                    for (let i = 0; i < 10; i++) {
                        console.log(`Starting iteration ${i + 1} for ${method} test on ${framework} with dataCount = ${dataCount} and numRequests = ${numRequests}...`);
                        
                        const command = method === 'GET'
                            ? `ab -c ${concurrencyLevel} -n ${numRequests} ${url}`
                            : `ab -m ${method} -c ${concurrencyLevel} -n ${numRequests} ${url}`;

                        try {
                            const data = await runAbTest(command);
                            console.log(`Completed iteration ${i + 1} for ${method} test on ${framework}.\n`);

                            const result = {
                                Framework: framework,
                                Method: method,
                                'Num Requests': numRequests,
                                DataCount: dataCount
                            };

                            // Parse results and add to the result and totals
                            for (const [key, regex] of Object.entries(patterns)) {
                                const match = data.match(regex);
                                if (match) {
                                    const value = parseFloat(match[1]);
                                    result[key] = value;
                                    averages[`${framework}-${method}-${dataCount}-${numRequests}`][key] += value; // Tambahkan ke total
                                }
                            }

                            allResults.push(result);
                        } catch (error) {
                            console.error(`Error during iteration ${i + 1} for ${method} test: ${error}`);
                        }
                    }

                    // Hitung rata-rata setelah 10 iterasi dan simpan ke dalam allResults
                    const avgResult = {
                        Framework: framework,
                        Method: method,
                        'Num Requests': numRequests,
                        DataCount: dataCount,
                        'Average Time taken for tests': averages[key]['Time taken for tests'] / 10,
                        'Average Requests per second': averages[key]['Requests per second'] / 10,
                        'Average Time per request': averages[key]['Time per request'] / 10,
                        'Average Transfer rate': averages[key]['Transfer rate'] / 10
                    };
                    allResults.push(avgResult); // Tambahkan rata-rata hasil ke data
                }
            }
        }
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hasil Pengujian');
    worksheet.columns = [
        { header: 'Framework', key: 'Framework', width: 15 },
        { header: 'Method', key: 'Method', width: 10 },
        { header: 'Num Requests', key: 'Num Requests', width: 15 },
        { header: 'Data Count', key: 'DataCount', width: 10 },
        { header: 'Time taken for tests', key: 'Time taken for tests', width: 20 },
        { header: 'Requests per second', key: 'Requests per second', width: 20 },
        { header: 'Time per request', key: 'Time per request', width: 20 },
        { header: 'Transfer rate', key: 'Transfer rate', width: 20 },
        { header: 'Average Time taken for tests', key: 'Average Time taken for tests', width: 25 },
        { header: 'Average Requests per second', key: 'Average Requests per second', width: 25 },
        { header: 'Average Time per request', key: 'Average Time per request', width: 25 },
        { header: 'Average Transfer rate', key: 'Average Transfer rate', width: 25 }
    ];

    allResults.forEach(result => worksheet.addRow(result));
    await workbook.xlsx.writeFile('./results/results.xlsx');
    console.log('Results with averages saved');
}

// Run the tests
runTests();