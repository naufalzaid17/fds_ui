/** @type {import('next').NextConfig} */

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', 
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', 
          },
        ],
      },
    ];
  },
};
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
})