const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConf = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const outputFile = "[name].[chunkhash]";
const assetFile = "[contenthash]";

module.exports = () =>
  merge(commonConf({ outputFile, assetFile }), {
    mode: "production",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
    ],
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCssPlugin()],
    },
  });
