require('dotenv').config();
const { createServer } = require('http');
const next = require('next');
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handle).listen(3000, () => {
    console.log('🚀 Server ready on port 3000');
  });
});
