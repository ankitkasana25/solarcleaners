module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // other plugins (if any) go here...

    'react-native-worklets/plugin', // 👈 must be LAST
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
