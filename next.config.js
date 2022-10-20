/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  mode: 'production',
  disable: false,
  runtimeCaching
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  /* basePath: '/dist', */
  compress: true,
  /* async redirects() {
    return [
      {
        source: 'hola',
        destination: 'hello',
        permanent: true
      }
    ]
  } */
});

module.exports = nextConfig;
