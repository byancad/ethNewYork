/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ALCHEMY_ID: process.env.ALCHEMY_ID,
    SPOTIFY_BASE_URL: process.env.SPOTIFY_BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
  }
};

module.exports = nextConfig;
