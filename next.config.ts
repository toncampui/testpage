import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Aquesta línia és obligatòria per a GitHub Pages
  basePath: '/testpage',
  assetPrefix: '/testpage/',
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    unoptimized: true, // Necessari si fas servir imatges i exportació estàtica
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;