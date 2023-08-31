/** @type {import('next').NextConfig} */

const transpiledModules = require('next-transpile-modules')(['react-fitty', 'fitty', 'smooth-scrollbar', 'easing-js']);
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n
}

module.exports = transpiledModules(nextConfig);
