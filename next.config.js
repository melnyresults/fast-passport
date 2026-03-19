/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    turbo: undefined,
  },
};

module.exports = nextConfig;
