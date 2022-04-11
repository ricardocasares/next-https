const fs = require('fs');
const path = require('path');
const proxy = require('http-proxy');

const RESET = "\x1b[0m";
const FG_RED = "\x1b[31m";
const FG_GREEN = "\x1b[32m";
const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 9000,
  target: 3000,
  key: path.resolve(__dirname, 'key.pem'),
  cert: path.resolve(__dirname, 'cert.pem'),
  enabled: process.env.NODE_ENV === 'development'
};

const withSSL = (userConfig) => nextUserConfig => {
  const cfg = { ...DEFAULT_CONFIG, ...userConfig };

  if (cfg.enabled) {
    const server = proxy.createServer({
      xfwd: true,
      ws: true,
      target: {
        host: cfg.host,
        port: cfg.target
      },
      ssl: {
        key: fs.readFileSync(cfg.key, "utf8"),
        cert: fs.readFileSync(cfg.cert, "utf8")
      }
    })
      .on("error", (err) => {
        console.error(`${FG_RED}next-ssl${RESET} - an error ocurred while proxying the request.`);
        console.error(err);
      });

    server.listen(cfg.port);
    console.log(`${FG_GREEN}next-ssl${RESET} - started SSL proxy on https://${cfg.host}:${cfg.port}`);
  };

  return nextUserConfig;
};

module.exports = withSSL;