/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.shopify.com', "dl.airtable.com", "lh3.googleusercontent.com", 'image.tmdb.org', 'rb.gy', "media.guim.co.uk"],
  },
  env: {
    siteTitle: 'MRShop',
    siteDescription: 'Life automation!',
    siteKeywords: 'dog, stickers, fun',
    siteUrl: 'https://www.mrshop.com',
    siteImagePreviewUrl: '/images/main.jpg',
    twitterHandle: '@elonmusk'
  },
};

const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
])

module.exports = withTM(nextConfig);
