/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Permite imágenes de localhost
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**', // Cambiado a `/media/**` porque es donde realmente está la imagen
      },
    ],
  },
};

module.exports = nextConfig;

