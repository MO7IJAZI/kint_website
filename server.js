const path = require('path');

// Set the working directory to the standalone folder
// This is necessary because the standalone server expects to run from its own directory
const standaloneDir = path.join(__dirname, '.next', 'standalone');

// Check if standalone directory exists (it might not during local dev if not built with standalone)
const fs = require('fs');
if (fs.existsSync(standaloneDir)) {
  process.chdir(standaloneDir);
  require(path.join(standaloneDir, 'server.js'));
} else {
  // Fallback for local development or if build failed
  console.log("Standalone directory not found. Starting standard Next.js server...");
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
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}
