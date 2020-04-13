const express = require('express');
const next = require('next');
const compression = require('compression');
const helmet = require('helmet');
const { redirectToHTTPS } = require('express-http-to-https');

const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
  server.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
  server.use(compression());
  server.use(helmet());
  server.enable('trust proxy');

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> ${process.env.NODE_ENV || 'Dev'} Ready on Port:${port}`);
  });
});
