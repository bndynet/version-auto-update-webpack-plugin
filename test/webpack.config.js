const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VersionAutoUpdateWebpackPlugin = require('../index');

module.exports = {
    mode: 'none',
    // entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', 'css']
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new VersionAutoUpdateWebpackPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    }
};