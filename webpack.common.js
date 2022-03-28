const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = ({ outputFile, assetFile }) => ({
  entry: { app: "./src/js/app.js", sub: "./src/js/sub.js" },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: `${outputFile}.js`,
    chunkFilename: `${outputFile}.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        // use は下から順に進んでいく
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // jsにバンドル
          "postcss-loader", // auto-prefixを付与
          "sass-loader", // sassをコンパイル
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff?2|ttf|eot)$/,
        loader: "file-loader",
        options: {
          name: `${assetFile}.[ext]`,
          outputPath: "images",
          publicPath: "images",
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new ESLintPlugin({
      extensions: ".js",
      exclude: "node_modules",
    }),
    new ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      utils: [path.resolve(__dirname, "src/js/utils"), "default"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        defaultVendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        utils: {
          name: "utils",
          test: /src[\\/]js[\\/]utils/,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "src/scss"),
      "@imgs": path.resolve(__dirname, "src/images"),
    },
    extensions: [".js", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
});
