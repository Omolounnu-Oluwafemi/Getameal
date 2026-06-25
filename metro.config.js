const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const nestedRNPath = path.resolve(
  __dirname,
  "node_modules/react-native/node_modules/react-native"
);

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    extraNodeModules: {
      "react-native": path.resolve(__dirname, "node_modules/react-native"),
    },
    blockList: [
      new RegExp(`^${nestedRNPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}.*`),
    ],
  };

  return config;
})();
