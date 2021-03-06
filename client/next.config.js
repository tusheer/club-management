
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    S3_URL: process.env.NEXT_PUBLIC_S3_URL,
    JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET
  },
  images: {
    domains: [],
  }

}

module.exports = nextConfig
