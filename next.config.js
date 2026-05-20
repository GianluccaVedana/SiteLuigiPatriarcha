/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    domains: ['via.placeholder.com', 'picsum.photos', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
