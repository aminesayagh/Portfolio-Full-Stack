/** @type {import('next').NextConfig} */
const transpiledModules = require('next-transpile-modules')(['react-fitty', 'fitty', 'smooth-scrollbar', 'easing-js']);


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  },

}

module.exports = transpiledModules(nextConfig);
