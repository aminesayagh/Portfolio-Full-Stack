/** @type {import('next').NextConfig} */

const transpiledModules = require('next-transpile-modules')(['react-fitty','fitty', 'locomotive-scroll']);
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true },
  i18n
}

module.exports = transpiledModules(nextConfig);
