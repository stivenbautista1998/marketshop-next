/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customKey: 'customValue',
  },
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
}

module.exports = nextConfig;
