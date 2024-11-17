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
    }
};

const numRequestsList = [50];
const dataCounts = [10];
const concurrencyLevel = 50;
const allResults = [];
const serverFiles = {
    Express: './frameworks/express.js'
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
        setTimeout(resolve, 5000); // Tunggu 5 detik agar server dapat berjalan dengan baik
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
    for (const framework in urlMap) {
        for (const dataCount of dataCounts) {
            for (const numRequests of numRequestsList) {
                for (const method of ['POST', 'GET', 'PUT', 'DELETE']) {
                    const url = urlMap[framework][method][dataCount];
                    console.log(`\nRunning ${method} test for ${framework} with dataCount = ${dataCount}, numRequests = ${numRequests}...\n`);

                    await stopServer(); // Stop server before test
                    await startServer(framework); // Start server for the test

                    // Run each method test 10 times
                    for (let i = 0; i < 2; i++) {
                        console.log(`Starting iteration ${i + 1} for ${method} test on ${framework}...`);
                        
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

                            for (const [key, regex] of Object.entries(patterns)) {
                                const match = data.match(regex);
                                if (match) {
                                    result[key] = parseFloat(match[1]);
                                }
                            }

                            allResults.push(result);
                        } catch (error) {
                            console.error(`Error during iteration ${i + 1} for ${method} test: ${error}`);
                        }
                    }
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
        { header: 'Transfer rate', key: 'Transfer rate', width: 20 }
    ];

    allResults.forEach(result => worksheet.addRow(result));
    await workbook.xlsx.writeFile('./results/results 2.xlsx');
    console.log('Results saved to results.xlsx');
}

// Run the tests
runTests();
