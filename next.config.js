const dotenv = require("dotenv");
const CircularDependencyPlugin = require("circular-dependency-plugin");

dotenv.config({
  path: `environments/.env.${process.env.BUILD_ENV} || local}`,
});

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const plugins = [];

if (process.env.ANALYZE === "true") {
  // only load dependency if env `ANALYZE` was set
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });

  plugins.push(withBundleAnalyzer);
}

plugins.push(withPWA);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        include: /src/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      })
    );

    return config;
  },
};

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
