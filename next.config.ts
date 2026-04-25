import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Aquesta línia és obligatòria per a GitHub Pages
  basePath: '/tonicamacho',
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