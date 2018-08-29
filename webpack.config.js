const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports ={
    entry: path.join(__dirname, 'src', 'index.js'),
    output:{
        path: path.join(__dirname, 'src', './dist'),
        filename: 'bundle.js',
    },
    module:{
        rules:[
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src','public', 'index.html'),
        }),
    ],
}