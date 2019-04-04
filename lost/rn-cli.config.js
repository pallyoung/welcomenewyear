
const path = require('path');
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx",".android.tsx",".ios.tsx"];
  },
  resolver: {
    extraNodeModules: {
      'react-native-ui': path.resolve(__dirname, './app/react-native-ui'),
      'native': path.resolve(__dirname, './app/native'),
      'utils': path.resolve(__dirname, './app/utils'),
      'themes': path.resolve(__dirname, './app/themes'),
      'components': path.resolve(__dirname, './app/components'),
      'router': path.resolve(__dirname, './app/router'),
      'config': path.resolve(__dirname, './app/config'),
      'providers': path.resolve(__dirname, './app/providers'),
      'actions': path.resolve(__dirname, './app/actions')
    },
  },
  projectRoot: path.resolve(__dirname),

};