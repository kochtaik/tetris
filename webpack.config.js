const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/script.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      /* JS/TS */
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      /* CSS/SCSS/SASS */
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      /* IMAGES, PICTURES */
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin({
      filename: "bundle.css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
