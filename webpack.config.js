var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./app.js",
  devtool: "source-map",
  output: {
    // path: path.resolve("./public"),
    path: path.resolve(__dirname, 'dist'),
    filename: "app.js",
    publicPath: '/',
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".json"],
    alias: {
      jquery: path.join(__dirname, "./jquery-stub.js"),
    },
  },
  plugins: [
    //
  ],

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$|.jsx?$/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    watchFiles: {
      paths: ["**/*"],
      options: {
        aggregateTimeout: 300,
        polling: 1000,
      },
    },
    static: {
      directory: "./public",
    },
    open: true,
    proxy: [
      {
        context: ["/api/*"],
        target: "http://127.0.0.1:5005",
      },
    ],
  },
};
