const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry point of your application
  entry: "./src/public/index.jsx",

  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3000, // You can specify your desired port here
  },

  // Module rules for processing different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i, // Pattern to match .scss or .sass files
        use: [
          "style-loader", // Injects CSS into the DOM via a <style> tag
          "css-loader", // Translates CSS into CommonJS modules
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Pattern to match image files
        type: "asset/resource", // Use asset module
      },
    ],
  },

  // Plugins configuration
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/html/index.html", // Path to your HTML template
      filename: "./index.html",
    }),
  ],

  // Enable source maps for debugging
  devtool: "source-map",

  // Mode configuration (development or production)
  mode: "development",
};
