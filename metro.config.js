const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve(
        "metro-react-native-babel-transformer"
      ),
      experimentalImportSupport: false,
      inlineRequires: true,
    },
    resolver: {
      sourceExts,
      assetExts,
    },
  };
})();
