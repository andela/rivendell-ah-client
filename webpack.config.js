const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { DefinePlugin } = require('webpack');
require('dotenv').config();

module.exports = (env) => {
  const common = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /.js$|.jsx$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.scss|\.sass|\.css/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [{
            loader: 'url-loader',
            options: { limit: 30000 },
          }],
        },
      ],
    },
    node: {
      fs: 'empty'
    },
    resolve: {
      modules: [path.resolve(__dirname), 'node_modules'],
      extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new CleanWebpackPlugin(['./src/dist', 'build'], {
        root: path.join(__dirname, 'src', 'dist'),
        dry: false,
        verbose: true,
      }),
      new DefinePlugin({
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
        'process.env.API_SECRET': JSON.stringify(process.env.API_SECRET),
        'process.env.CLOUD_NAME': JSON.stringify(process.env.CLOUD_NAME),
        'process.env.BASE_URL':JSON.stringify(process.env.BASE_URL),
        'process.env.FACEBOOK_ID':JSON.stringify(process.env.FACEBOOK_ID)
      }),
    ],
  };
  if (env.mode === 'development') {
    return Object.assign(common, {
      devtool: 'inline-source-map',
      devServer: {
        contentBase: './dist',
        historyApiFallback: true,
      },
    });
  }

  if (env.mode === 'production') {
    return Object.assign(common, {
      devtool: 'source-map',
    });
  }
  return common;
};
