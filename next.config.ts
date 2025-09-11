import type { NextConfig } from "next";
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
};
const nextConfig: NextConfig = {
  i18n,
  images: {
    domains: ["i.imgflip.com"],
  },
};

export default nextConfig;
