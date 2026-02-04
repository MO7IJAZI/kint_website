const path = require('path');
const fs = require('fs');

// Load environment variables from the root .env file
// We do this BEFORE anything else to ensure they are available
const envPath = path.join(__dirname, '.env');
try {
  require('dotenv').config({ path: envPath });
  console.log(`Loaded environment variables from ${envPath}`);
} catch (e) {
  console.error("Failed to load .env file:", e);
}

const LOG_FILE = path.join(__dirname, 'server-start.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  try {
    fs.appendFileSync(LOG_FILE, logMessage);
  } catch (e) {
    console.error("Failed to write to log file:", e);
  }
}

process.on('uncaughtException', (err) => {
  log(`Uncaught Exception: ${err.message}`);
  log(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

log("Starting server.js...");

// Set the working directory to the standalone folder
// This is necessary because the standalone server expects to run from its own directory
const standaloneDir = path.join(__dirname, '.next', 'standalone');

// Check if standalone directory exists
if (fs.existsSync(standaloneDir)) {
  log(`Standalone directory found at ${standaloneDir}`);
  try {
    process.chdir(standaloneDir);
    log(`Changed working directory to ${process.cwd()}`);
    
    // Check if node_modules exists in standalone
    const nodeModulesPath = path.join(standaloneDir, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        log("WARNING: node_modules not found in standalone directory!");
    } else {
        log("node_modules found in standalone directory.");
    }

    require(path.join(standaloneDir, 'server.js'));
    log("Required standalone server.js");
  } catch (err) {
    log(`Error starting standalone server: ${err.message}`);
    log(err.stack);
    process.exit(1);
  }
} else {
  // Fallback for local development or if build failed
  log("Standalone directory not found. Starting standard Next.js server...");
  try {
    const { createServer } = require('http');
    const { parse } = require('url');
    const next = require('next');

    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();
    const port = process.env.PORT || 3000;

    app.prepare().then(() => {
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen(port, (err) => {
        if (err) throw err;
        log(`> Ready on http://localhost:${port}`);
      });
    }).catch((err) => {
      log(`Error preparing Next.js app: ${err.message}`);
      log(err.stack);
      process.exit(1);
    });
  } catch (err) {
    log(`Critical error in fallback server: ${err.message}`);
    log(err.stack);
    process.exit(1);
  }
}
