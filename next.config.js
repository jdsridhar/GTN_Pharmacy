// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Enables static HTML export
  images: {
    unoptimized: true, // 👈 Disables Image Optimization API for static export
  },
  // Optional: set base path if site is not at root domain
  // basePath: '',
};

export default nextConfig;