/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve resized AVIF/WebP instead of the raw ~1400px JPEGs. If you self-host (not Vercel), run `pnpm add sharp`.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Tuned to the source images (max ~1584px wide) and common phone widths at 2x.
    deviceSizes: [384, 640, 828, 1080, 1280, 1600],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@base-ui/react'],
  },
  // The Content-Security-Policy (with a per-request nonce) is set in proxy.ts.
  // These headers are static and apply to every response.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
          },
        ],
      },
      {
        // Originals in /public/images; browsers get the optimized copies from /_next/image.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
}

export default nextConfig
