/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Type checking is done in prebuild script
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint runs during prebuild
    ignoreDuringBuilds: false,
  },
  // Disable typedRoutes to prevent TypeScript errors
  typedRoutes: false,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig