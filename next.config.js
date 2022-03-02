/* eslint-disable no-param-reassign */
// const withOffline = require('next-offline');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');
const replace = require('@rollup/plugin-replace');

const dev = process.env.NODE_ENV !== 'production';

module.exports = withPlugins([
  // [
  //   replace({
  //     preventAssignment: true,
  //   })
  // ],
  // [withOffline({
  //   // target: 'serverless',
  //   transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
  //   // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  //   // turn on the SW in dev mode so that we can actually test it
  //   generateInDevMode: dev,
  //   generateSw: true,
  //   workboxOpts: {
  //     swDest: 'static/service-worker',
  //     runtimeCaching: [
  //       {
  //         urlPattern: /^https?.*/,
  //         handler: 'NetworkFirst',
  //         options: {
  //           cacheName: 'https-calls',
  //           networkTimeoutSeconds: 15,
  //           expiration: {
  //             maxEntries: 150,
  //             maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
  //           },
  //           cacheableResponse: {
  //             statuses: [0, 200],
  //           },
  //         },
  //       },
  //     ],
  //   },
  // })],
], {
  // webpack5: false,
  images: {
    domains: ['devmeister.andrescaballero.ch'],
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  extends: ['eslint:recommended', 'next'],
  webpack(config, { dev }) {
    config.resolve.alias = { ...config.resolve.alias, 'react-pdf': 'react-pdf/dist/entry.noworker' };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/assets/scss/nextjs-material-dashboard-pro')],
  },
  env: {
    ROOT: __dirname,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: 'G-DJ6Q9WZ60R',
    IMAGEPROVIDER: 'https://devmeister.andrescaballero.ch'
  }
});
