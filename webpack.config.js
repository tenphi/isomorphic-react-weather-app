const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || 'development';
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

module.exports = {
  mode,
  entry: ['./client/index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    chunkFilename: "bundle.[id].js"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'shared')
        ],
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['syntax-async-functions', 'bluebird-async-functions', 'transform-regenerator', 'transform-class-properties']
          },
        }],
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 2 } },
          { loader: 'postcss-loader', options: { plugins: () => [autoprefixer, csswring] }},
          'svg-transform-loader/encode-query'
        ],
      },
      {
        test: /\.less$/,
        use: ['less-loader'],
      },
      {
        test: /\.svg/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]',
            },
          },
          'svg-transform-loader',
          {
            loader: 'img-loader',
            options: {
              bypassOnDebug: true,
              optimizationLevel: 7,
              interlaced: false,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
      chunkFilename: "bundle.[id].css"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PORT: '8080'
    })
  ]
};
