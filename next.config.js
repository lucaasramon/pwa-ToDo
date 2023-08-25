const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-svgr')
const withPWA = require('next-pwa')

module.exports = withPlugins([
  {experimental: {
    async rewrites() {
      return [
        { source: '/service-worker.js', destination: '/_next/static/service-worker.js' },
      ];
    },
  }},
  [withPWA, {
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
      register: true,
      sw: '/sw.js'
    }
  }],
])