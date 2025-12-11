const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    transformer: {
        enableBabelRCLookup: true,
        minifierPath: 'metro-minify-terser',
        minifierConfig: {
            // terser config
        },
    },

};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
