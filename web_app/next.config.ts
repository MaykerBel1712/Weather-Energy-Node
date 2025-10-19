import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Necesario para exportar imágenes en modo estático
  },
  /* config options here */
};

export default nextConfig;
