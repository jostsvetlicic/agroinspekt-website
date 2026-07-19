import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats where supported (AVIF first, then WebP), falling
    // back to the original. Smaller files and sharper at a given render size.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
