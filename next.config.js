/** @type {import('next').NextConfig} */
const transpiledModules = require('next-transpile-modules')(['react-fitty', 'fitty']);


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  },

}

module.exports = transpiledModules(nextConfig);
