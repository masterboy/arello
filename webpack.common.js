const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    // filename: '[name].[contentHash].js', // Only use in production
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            "vue-style-loader",
            // Use Mini CSS Extract only on production
            // {
            //     loader: MiniCssExtractPlugin.loader,
            //     options: {
            //       publicPath: '../',
            //       hmr: process.env.NODE_ENV === 'development',
            //     },
            // },
            "css-loader", 
            "sass-loader"
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
};