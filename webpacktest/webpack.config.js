const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "app.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options:{
            presets:['@babel/preset-env','@babel/preset-react']
        },
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "app.html"),
      filename: "index.html",
    }),
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "dist"),
  },
};
