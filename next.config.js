const withHttps = require('./index');

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withHttps({
  port: 9000
})(nextConfig);
