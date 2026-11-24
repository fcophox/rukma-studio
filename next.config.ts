import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    /*
     * Para no agotar la cuota de Image Optimization de Vercel, que cuenta cada
     * variante generada y sus KB escritos en caché: sin las variantes de 2048 y
     * 3840 px, y con 31 días de caché (las imágenes locales se indexan por su
     * contenido, así que cambiarlas ya invalida la caché por sí solo).
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
