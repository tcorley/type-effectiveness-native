// Updated for Node.js 22 compatibility
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  webpack: (config) => {
    // Fix for react-native-web directory import issues with Node.js 22
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-web/dist/exports/StyleSheet/compiler$': 
        'react-native-web/dist/exports/StyleSheet/compiler/index.js',
    };

    return config;
  },
});
