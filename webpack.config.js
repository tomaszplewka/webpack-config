const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const MiniSVGDataURI = require('mini-svg-data-uri');

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  // "build": "webpack --mode production" // replaced in package.json
  // mode: "development",
  mode,
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
    // assetModuleFilename: "images/[name][ext]", // goes with asset/resource and ensures that static filenames are not changed by webpack automatically
    assetModuleFilename: "images/[hash][ext]", // hash instead of name for caching
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
  // needs to be here if you wanna import components without .jsx extension (by default only .js is supported)
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack",
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      // babel-loader
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // when options property is missing -> babel-loader uses configs defined in babel.config.js or .babelrc files
          // options: {
          //   presets: ["@babel/preset-env", "@babel/preset-react"],
          // },
        },
      },
      // static assets loader (webpack built-in functionality from webpack 5)
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i, // when there are spaces between |, it functionality does not work properly!
        // asset/resource - outputs images into separate files
        // type: "asset/resource",
        // asset/inline - outputs images into js files
        // type: "asset/inline",
        // generator: {
        //   dataUrl: content => {
        //     content = content.toString();
        //     return MiniSVGDataURI(content);
        //   }
        // },
        // asset - webpack decides based on asset size whether it should be inline or in image directory
        type: "asset",
        // manipulate file max size --> default is 8 kB
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 40 * 1024,
        //   },
        // },
      },
      // css loader
      {
        test: /\.(s?)css$/i,
        // use: [MiniCssExtractPlugin.loader, "css-loader"], // here in webpack arrays read 'right' to 'left', so once css file is encountered css-loader is applied which is followed by MiniCssExtractPlugin.loader
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      }
    ],
  },
};
