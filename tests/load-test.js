const { spawn } = require('child_process');
const path = require('path');
const http = require('http');
const autocannon = require('../backend/node_modules/autocannon');

const serverPath = path.join(__dirname, '../backend/dist/backend/src/server.js');
const port = 5000;
const healthUrl = `http://localhost:${port}/api/health`;

console.log('==================================================');
console.log('🚀 BASELINE/LOAD TESTING SUITE INITIALIZATION');
console.log('==================================================');

// 1. Spawn the backend server
console.log(`Starting backend server on port ${port}...`);
const server = spawn('node', [serverPath], {
  env: {
    ...process.env,
    PORT: port,
    NODE_ENV: 'production',
    DISABLE_RATE_LIMITER: 'true'
  }
});

let serverExited = false;
server.on('exit', (code, signal) => {
  serverExited = true;
  console.log(`\nBackend server exited with code ${code} and signal ${signal}`);
});

server.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(`[Server Logs]: ${output.trim()}`);
});

server.stderr.on('data', (data) => {
  console.error(`[Server Error]: ${data.toString().trim()}`);
});

// Helper to cleanup server on process exit
function cleanup() {
  if (!serverExited) {
    console.log('\nShutting down backend server...');
    server.kill();
  }
}

process.on('SIGINT', () => {
  cleanup();
  process.exit(1);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(1);
});
process.on('exit', () => {
  cleanup();
});

// 2. Poll the health check endpoint until it's ready
function waitForServer(url, callback, retries = 30) {
  if (retries === 0) {
    callback(new Error('Server failed to start and return 200 health check status.'));
    return;
  }
  
  http.get(url, (res) => {
    if (res.statusCode === 200) {
      callback(null);
    } else {
      setTimeout(() => waitForServer(url, callback, retries - 1), 500);
    }
  }).on('error', () => {
    setTimeout(() => waitForServer(url, callback, retries - 1), 500);
  });
}

console.log('Waiting for backend server to be healthy...');
waitForServer(healthUrl, (err) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    cleanup();
    process.exit(1);
  }

  console.log('Backend server is healthy and ready to receive requests.');
  console.log('\nStarting load test:');
  console.log('- 100 Virtual Users (Concurrent connections)');
  console.log('- Running continuously for 1 minute (60 seconds)\n');

  // 3. Configure and run autocannon
  const instance = autocannon({
    url: `http://localhost:${port}/api/prediction/assess-risk`,
    connections: 100,
    duration: 60,
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      answers: {
        age: 35,
        diabetes: "No",
        brushingFrequency: "Twice daily",
        brushingDuration: "1–2 minutes",
        interdentalCleaning: "Yes",
        interdentalFrequency: "Daily",
        sleepHours: 7,
        smokingStatus: "Never smoked",
        alcoholConsumption: "Occasionally",
        gumBleeding: "No",
        gumSwelling: "No",
        toothSensitivity: "None",
        looseTeeth: "No",
        lastDentalVisit: "3–6 months ago",
        cleaningFrequency: "Every 6 months",
        sugarConsumption: "Moderate",
        waterIntake: 2.0
      }
    })
  }, (err, result) => {
    if (err) {
      console.error('Error during load test:', err);
      cleanup();
      process.exit(1);
    }

    console.log('\n==================================================');
    console.log('📊 LOAD TEST COMPLETED');
    console.log('==================================================');
    
    // Print the standard formatted autocannon result table
    console.log(autocannon.printResult(result));
    
    // Print custom summary matching user requirement style
    console.log('--------------------------------------------------');
    console.log('📝 Quick Metrics Summary:');
    console.log(`Requests per second (RPS): ${result.requests.average.toFixed(2)} req/sec`);
    console.log(`Total Requests Sent: ${result.requests.sent}`);
    console.log(`Response Time (Latency):`);
    console.log(`  - Average: ${result.latency.average} ms`);
    console.log(`  - Min: ${result.latency.min} ms`);
    console.log(`  - Max: ${result.latency.max} ms`);
    console.log(`  - P50 (Median): ${result.latency.p50} ms`);
    console.log(`  - P99 (Slowest 1%): ${result.latency.p99} ms`);
    console.log(`Errors / Non-2xx Responses: ${result.errors + result.non2xx}`);
    console.log('==================================================');

    cleanup();
    process.exit(0);
  });

  // Track progress and display a neat live command line output
  autocannon.track(instance, { renderProgressBar: true });
});
