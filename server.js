const path = require('path');
const fs = require('fs');
const http = require('http');

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

// Fallback server to show errors in browser instead of 503
function startFallbackServer(errorMessage) {
  log("Starting fallback error server...");
  const port = process.env.PORT || 3000;
  
  const server = http.createServer((req, res) => {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>Deployment Error</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
            .error-box { background: #fee; border: 1px solid #c00; padding: 1rem; border-radius: 4px; }
            pre { background: #f5f5f5; padding: 1rem; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h1>Deployment Failed</h1>
          <p>The application failed to start. Here is the error log:</p>
          <div class="error-box">
            <pre>${errorMessage}</pre>
          </div>
          <p>Please check server-debug.log for more details.</p>
        </body>
      </html>
    `);
  });

  server.listen(port, () => {
    log(`Fallback server listening on port ${port}`);
  });
}

process.on('uncaughtException', (err) => {
  log(`Uncaught Exception: ${err.message}`);
  log(err.stack);
  startFallbackServer(`Uncaught Exception: ${err.message}\n${err.stack}`);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled Rejection: ${reason}`);
  startFallbackServer(`Unhandled Rejection: ${reason}`);
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
    startFallbackServer(`Error starting standalone server: ${err.message}\n${err.stack}`);
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
      startFallbackServer(`Error preparing Next.js app: ${err.message}\n${err.stack}`);
    });
  } catch (err) {
    log(`Critical error in fallback server: ${err.message}`);
    log(err.stack);
    startFallbackServer(`Critical error in fallback server: ${err.message}\n${err.stack}`);
  }
}
