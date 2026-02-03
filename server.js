require('dotenv').config();
const { createServer } = require('http');
const next = require('next');
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const port = process.env.PORT || 3000;
  createServer(handle).listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on port ${port}`);
  });
});
