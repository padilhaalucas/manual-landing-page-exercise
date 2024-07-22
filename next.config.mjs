/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: "dist",
  swcMinify: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
