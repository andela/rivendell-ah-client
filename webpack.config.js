const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

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
      new Dotenv(),
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
