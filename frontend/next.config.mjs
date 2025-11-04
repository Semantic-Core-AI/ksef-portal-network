/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true,

  // Enable optimized images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Production settings
  reactStrictMode: true,
  poweredByHeader: false,

  // TypeScript - fix errors instead of ignoring
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig;
