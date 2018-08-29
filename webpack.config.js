const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports ={
    entry: path.join(__dirname, 'src', 'index.js'),
    output:{
        path: path.join(__dirname, 'src', './dist'),
        filename: 'index_bundle.js',
    },
    module:{
        rules:[
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel_loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.html'),
        }),
    ],
}