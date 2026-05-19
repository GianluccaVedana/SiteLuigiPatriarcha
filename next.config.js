/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    domains: ['via.placeholder.com', 'picsum.photos'],
  },
}

module.exports = nextConfig
