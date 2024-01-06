/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
};

module.exports = nextConfig;
