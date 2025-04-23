/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 💥 Desativa o ESLint durante o build
  },
};

module.exports = nextConfig;
