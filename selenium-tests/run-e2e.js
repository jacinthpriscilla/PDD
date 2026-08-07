const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

console.log('==================================================');
console.log('🚀 STARTING E2E SELENIUM FRONTEND + BACKEND RUNNER');
console.log('==================================================');

const backendServerPath = path.resolve(__dirname, '../backend/dist/backend/src/server.js');
const frontendDir = path.resolve(__dirname, '../frontend-web');

let backendExited = false;
let frontendExited = false;

// 1. Start Backend Server
console.log('Spawning Backend Server on port 5001...');
const backend = spawn('node', [backendServerPath], {
  env: {
    ...process.env,
    PORT: 5001,
    NODE_ENV: 'production',
    DISABLE_RATE_LIMITER: 'true'
  }
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend]: ${data.toString().trim()}`);
});
backend.stderr.on('data', (data) => {
  console.error(`[Backend Error]: ${data.toString().trim()}`);
});
backend.on('exit', (code) => {
  backendExited = true;
  console.log(`Backend server exited with code ${code}`);
});

// 2. Start Frontend Server
console.log('Spawning Vite Frontend Server on port 5173...');
const frontend = spawn('npx', ['vite', '--port', '5173', '--strictPort'], {
  cwd: frontendDir,
  shell: true,
  env: {
    ...process.env,
    VITE_API_URL: 'http://localhost:5001/api'
  }
});

frontend.stdout.on('data', (data) => {
  console.log(`[Frontend]: ${data.toString().trim()}`);
});
frontend.stderr.on('data', (data) => {
  console.error(`[Frontend Error]: ${data.toString().trim()}`);
});
frontend.on('exit', (code) => {
  frontendExited = true;
  console.log(`Frontend server exited with code ${code}`);
});

// Cleanup helper
function cleanup() {
  console.log('\nCleaning up E2E servers...');
  if (!backendExited) {
    console.log('Killing backend server...');
    backend.kill();
  }
  if (!frontendExited) {
    console.log('Killing frontend server...');
    frontend.kill();
  }
}

process.on('SIGINT', () => { cleanup(); process.exit(1); });
process.on('SIGTERM', () => { cleanup(); process.exit(1); });

// 3. Wait for both servers to be responsive
function checkUrl(url, callback) {
  http.get(url, (res) => {
    if (res.statusCode === 200 || res.statusCode === 304 || res.statusCode === 404) {
      // 404 from frontend is okay as long as server is up (Vite dev server returns 200/304 for index.html though)
      callback(null);
    } else {
      callback(new Error(`Status ${res.statusCode}`));
    }
  }).on('error', (err) => {
    callback(err);
  });
}

function wait(retries = 30, callback) {
  if (retries === 0) {
    callback(new Error('Timeout waiting for backend (5001) or frontend (5173) to start.'));
    return;
  }

  checkUrl('http://localhost:5001/api/health', (backendErr) => {
    if (backendErr) {
      setTimeout(() => wait(retries - 1, callback), 1000);
      return;
    }
    // Backend is ready, check frontend
    checkUrl('http://localhost:5173/', (frontendErr) => {
      if (frontendErr) {
        setTimeout(() => wait(retries - 1, callback), 1000);
        return;
      }
      // Both ready!
      callback(null);
    });
  });
}

console.log('Waiting for both servers to respond...');
wait(30, (err) => {
  if (err) {
    console.error(err.message);
    cleanup();
    process.exit(1);
  }

  console.log('\n==================================================');
  console.log('🏁 SERVERS READY - RUNNING SELENIUM TESTS');
  console.log('==================================================');
  const tests = spawn('node', [path.resolve(__dirname, 'tests/run-selenium-300.js')], {
    env: {
      ...process.env,
      TEST_URL: 'http://localhost:5173/login'
    },
    stdio: 'inherit'
  });

  tests.on('exit', (testCode) => {
    console.log(`Selenium tests finished with code ${testCode}`);

    // 5. Run Excel Generation regardless of test success/failure to have reports
    console.log('\nGenerating Excel QA Test Suite Report...');
    const excel = spawn('node', [path.resolve(__dirname, 'generate-excel.js')], {
      stdio: 'inherit'
    });

    excel.on('exit', (excelCode) => {
      console.log(`Excel generation finished with code ${excelCode}`);
      cleanup();
      process.exit(testCode === 0 && excelCode === 0 ? 0 : 1);
    });
  });
});
