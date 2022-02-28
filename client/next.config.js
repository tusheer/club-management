/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    NODE_ENV : process.env.NEXT_NODE_ENV
  },
}

module.exports = nextConfig
