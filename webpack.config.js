const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/preset-react"],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: './assets/images',
          esModule: false,
        },
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "bundles/[name].bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "src/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/pages/index.html', to: '' },
        { from: 'src/scripts/fpsmeter.min.js', to: 'scripts' },
        { from: 'src/scripts/engine.js', to: 'scripts' },
        { from: 'src/scripts/letter-detonator.js', to: 'scripts' },
        { from: 'src/scripts/menu-controller.js', to: 'scripts' },
        { from: 'src/scripts/ld-storage-controller.js', to: 'scripts' },
        { from: 'src/assets/characters/Dude_Monster.png', to: 'assets/characters' },
        { from: 'src/assets/characters/Owlet_Monster.png', to: 'assets/characters' },
        { from: 'src/assets/characters/Pink_Monster.png', to: 'assets/characters' },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {},
      })
    ],
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  },
};
