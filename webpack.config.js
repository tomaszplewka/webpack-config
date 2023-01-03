const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // entry: path.resolve(__dirname, "src/index.jsx"),
  entry: {
    bundle: path.resolve(__dirname, "src/index.jsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "bundle.js",
    // filename: "[name].js", // dynamic filename based on entry name
    filename: "[name].[contenthash].js", // caching
    clean: true, // deletes dist folder on each yarn build !!!yarn start runs files from the memory and not the dist folder
    assetModuleFilename: "[name][ext]", // goes with asset/resource and ensures that static filenames are not changed by webpack automatically
  },
  devtool: "source-map",
  // "start": "webpack-dev-server --mode development --open --hot", // devServer entry configures everything instead of package.json
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack",
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
  module: {
    rules: [
      // babel-loader
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // static assets loader (webpack built-in functionality)
      {
        test: /\.(png | jpg | jpeg | svg | gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
