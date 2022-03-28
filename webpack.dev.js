const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConf = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";

module.exports = () =>
  merge(commonConf({ outputFile, assetFile }), {
    mode: "development",
    devtool: "source-map",
    devServer: {
      open: true,
      static: {
        directory: "./public",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        chunks: ["app"],
      }),
      new HtmlWebpackPlugin({
        template: "./src/other.html",
        filename: "other.html",
        inject: "body",
        chunks: ["sub"],
      }),
    ],
  });
