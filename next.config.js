/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
dotenv.config({
  path: `environments/.env.${process.env.BUILD_ENV} || local}`,
});
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = nextConfig;
