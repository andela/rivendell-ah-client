const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
  const common = {
    entry: path.join(__dirname, 'src', 'index.js'),
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
          test: /\.(png|jpg|jpeg)$/,
          use: [{
            loader: 'url-loader',
            options: { limit: 30000 },
          }],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new CleanWebpackPlugin(['./src/dist', 'build'], {
        root: path.join(__dirname, 'src', 'dist'),
        dry: false,
        verbose: true,
      })
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

