// Updated for Node.js 22 compatibility
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  webpack: (config) => {
    // Configure module resolution for better Node.js 22 compatibility
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false, // Allow importing without file extensions
      },
    });

    return config;
  },
});
