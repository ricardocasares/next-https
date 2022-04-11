# next-https

This is a simple HTTPS proxy to be used with Next.js in local development.

## Motivation

A secure HTTP connection is necessary when interfacing with certain [Web APIs restricted to secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts/features_restricted_to_secure_contexts). This package simply starts an HTTP proxy pointing at your Next.js server instance to simplify local development.

## Getting Started

Install the package

`yarn add next-https`

Inside your Next.js configuration file:

```js
// next.config.js
const useHttps = require("next-https");

// You can pass options here
const withHttps = useHttps({
  enabled: process.env.NODE_ENV === "development",
});

// pass your Next.js options here
module.exports = withHttps({
  reactStrictMode: true,
});
```

**NOTE:** When using the default configuration options, you'll have to accept the self-signed certificate the first time you access the page. This is safe to do in a local development environment only.

## Configuration

You can use `next-https` with default configuration options.

| name      | required | description                                                   |
| --------- | -------- | ------------------------------------------------------------- |
| `enabled` | `no`     | Defaults to `process.env.NODE_ENV === 'development'`          |
| `host`    | `no`     | Next.js server hostname, defaults to `localhost`              |
| `target`  | `no`     | Next.js port target, defaults to `3000`                       |
| `key`     | `no`     | Path to the key, defaults to this package's key file          |
| `cert`    | `no`     | Path to the certificate, defaults to this package's cert file |

### Using custom certificates

If you want to use a custom domain name or to remove the initial warning from your browser, you'll need to setup your own certificates.

To avoid the warnings you need to install the local root CA in your computer in order for your browser to trust the certificates.

For this you can use [`mkcert`](https://github.com/FiloSottile/mkcert)

```sh
brew install mkcert
```

Install the local CA

```sh
mkcert -install
```

Create the certificate files

```sh
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
```

And pass your custom certificate and key

```js
// next.config.js
const nextHttps = require("next-https");

// You can pass options here
const withHttps = nextHttps({
  host: "example.com",
  key: './path/to/example-key.pem'),
  cert: './path/to/example-cert.pem'),
});

// pass your Next.js options here
module.exports = withHttps({
  reactStrictMode: true,
});
```
