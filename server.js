const path = require('path');
const fs = require('fs');

// Load environment variables from the root .env file
const envPath = path.join(__dirname, '.env');
try {
  require('dotenv').config({ path: envPath });
} catch (e) {
  console.error("Failed to load .env file:", e);
}

const LOG_FILE = path.join(__dirname, 'server-debug.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message); // Log to stdout for Hostinger console
  try {
    fs.appendFileSync(LOG_FILE, logMessage);
  } catch (e) {
    // Ignore logging errors
  }
}

process.on('uncaughtException', (err) => {
  log(`Uncaught Exception: ${err.message}`);
  log(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

log("Starting server.js...");
log(`NODE_ENV: ${process.env.NODE_ENV}`);
log(`PORT: ${process.env.PORT || 3000}`);
log(`Current Directory: ${process.cwd()}`);

const standaloneDir = path.join(__dirname, '.next', 'standalone');

if (fs.existsSync(standaloneDir)) {
  log(`Standalone directory found at ${standaloneDir}`);
  try {
    process.chdir(standaloneDir);
    log(`Changed working directory to ${process.cwd()}`);
    
    // Verify node_modules in standalone
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        log("WARNING: node_modules not found in standalone directory! App may crash if dependencies are missing.");
    } else {
        log("node_modules found in standalone directory.");
    }

    // Start the standalone server
    require(path.join(process.cwd(), 'server.js'));
    log("Required standalone server.js");
  } catch (err) {
    log(`Error starting standalone server: ${err.message}`);
    log(err.stack);
    process.exit(1);
  }
} else {
  // Fallback: Standard Next.js server
  log("Standalone directory NOT found. Falling back to standard Next.js server.");
  log("Ensure 'next build' completed successfully.");
  
  try {
    const next = require('next');
    const { createServer } = require('http');
    const { parse } = require('url');

    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev, dir: __dirname });
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
