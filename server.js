// Robust Server.js for Hostinger with Error Logging and Fallback
require('dotenv').config();
const { createServer } = require('http');
const fs = require('fs');
const path = require('path');
const next = require('next');

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

log("Starting server.js...");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Fallback server function
function startFallbackServer(errorMessage) {
  log("Starting FALLBACK server due to error: " + errorMessage);
  
  createServer((req, res) => {
    res.writeHead(503, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>503 Service Unavailable</h1>
      <p>The application failed to start.</p>
      <p><strong>Error:</strong> ${errorMessage}</p>
      <p>Please check <code>server-start.log</code> in the root directory for more details.</p>
      <p><em>Possible causes: Missing build (.next folder), missing dependencies, or database connection error.</em></p>
    `);
  }).listen(port, (err) => {
    if (err) log("Fallback server failed to start: " + err);
    else log(`Fallback server listening on port ${port}`);
  });
}

try {
  log(`Initializing Next.js (dev: ${dev})...`);
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare()
    .then(() => {
      log("Next.js prepared successfully.");
      createServer((req, res) => {
        handle(req, res);
      }).listen(port, (err) => {
        if (err) throw err;
        log(`🚀 Next.js Server ready on port ${port}`);
      });
    })
    .catch((err) => {
      log("Error during app.prepare(): " + err.stack);
      startFallbackServer("Next.js build not found or failed to load. Ensure 'npm run build' was successful. Details: " + err.message);
    });

} catch (err) {
  log("Critical error in server.js: " + err.stack);
  startFallbackServer("Critical startup error: " + err.message);
}
