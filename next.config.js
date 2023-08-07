/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.steamstatic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steamcommunity-a.akamaihd.net',
      },
      {
        protocol: 'https',
        hostname: 'bit.ly',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
}

module.exports = nextConfig
