const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports ={
    entry: path.join(__dirname, 'src', 'index.js'),
    output:{
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module:{
        rules:[
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss|\.sass|\.css/,
                use: ['style-loader','css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [{
                  loader: 'url-loader',
                  options: { limit: 30000 },
                }],
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'public', 'index.html'),
        }),
        new CleanWebpackPlugin(['./src/dist', 'build'], {
            root:  path.join(__dirname, 'src','dist'),
            dry: false,
            verbose:true
        })
    ],
}