import { run, bench, group } from 'mitata';
import * as xlsx from 'xlsx';
const axios = require('axios');

const servers = {
  express: "http://localhost:3000/",
  // hapi: "http://localhost:3001/",
  // koa: "http://localhost:3002/",
  // nest: "http://localhost:3003/",
  // elysia: "http://localhost:3004/",
  // fastify: "http://localhost:3005/"
};

// Fungsi untuk menjalankan benchmarking untuk satu framework
const runFrameworkBenchmark = async (framework) => {
  group(framework, () => {

    bench('GetHelloWorld', async () => {
      await axios.get(`${servers[framework]}`);
    });

    // 10 data
    bench('post10data', async () => {
      await axios.post(`${servers[framework]}post10data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('get10data', async () => {
      await axios.get(`${servers[framework]}get10data`);
    });
    bench('put10data', async () => {
      await axios.put(`${servers[framework]}put10data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('delete10data', async () => {
      await axios.delete(`${servers[framework]}delete10data`);
    });

    // 100 data
    bench('post100data', async () => {
      await axios.post(`${servers[framework]}post100data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('get100data', async () => {
      await axios.get(`${servers[framework]}get100data`);
    });
    bench('put100data', async () => {
      await axios.put(`${servers[framework]}put100data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('delete100data', async () => {
      await axios.delete(`${servers[framework]}delete100data`);
    });

    // 500 data
    bench('post500data', async () => {
      await axios.post(`${servers[framework]}post500data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('get500data', async () => {
      await axios.get(`${servers[framework]}get500data`);
    });
    bench('put500data', async () => {
      await axios.put(`${servers[framework]}put500data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('delete500data', async () => {
      await axios.delete(`${servers[framework]}delete500data`);
    });

    // 1000 data
    bench('post1000data', async () => {
      await axios.post(`${servers[framework]}post1000data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('get1000data', async () => {
      await axios.get(`${servers[framework]}get1000data`);
    });
    bench('put1000data', async () => {
      await axios.put(`${servers[framework]}put1000data`, {}, { headers: { 'Content-Type': 'application/json' } });
    });
    bench('delete1000data', async () => {
      await axios.delete(`${servers[framework]}delete1000data`);
    });
  });

  return await run({
    units: false, 
    silent: false, 
    avg: true, 
    json: false, 
    colors: true, 
    min_max: false, 
    percentiles: false, 
  });
};

// Fungsi utama
const main = async () => {
  const results = [];
  let firstIteration = true;

  // Daftar framework yang akan diuji
  const frameworks = ['express'];

  for (let i = 0; i < 2; i++) {
    for (const framework of frameworks) {
      console.log(`Running benchmark for ${framework} (Iteration ${i + 1})...`);
      const result = await runFrameworkBenchmark(framework);

      // Simpan hasil setiap framework
      let data = result.benchmarks.map((res) => ({
        iteration: i + 1,
        framework,
        name: res.name,
        average: res.stats.avg
      }));

      if (!firstIteration) {
        // Ambil hanya 17 data terakhir dari iterasi setelah yang pertama
        data = data.slice(0, 17);
      } else {
        firstIteration = false;
      }

      // Debug log untuk memastikan data yang benar
      console.log(`Iteration ${i + 1} ${framework} results:`, data);

      results.push(...data);
    }
  }

  // Buat worksheet dari data hasil benchmarking
  const ws = xlsx.utils.json_to_sheet(results);

  // Buat workbook dan tambahkan worksheet
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Benchmark Results');

  // Simpan file Excel
  xlsx.writeFile(wb, 'benchmark_results_express.xlsx');

  console.log('Data benchmarking berhasil disimpan ke benchmark_results.xlsx');
};

// Jalankan fungsi utama
main();
