//Webpack requires this to work with directories
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// This is main configuration object that tells Webpackw what to do.
module.exports = {
    //path to entry paint
    entry: './src/index.js',
    // don't use eval
    devtool: 'cheap-source-map',
    //path and filename of the final output
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js',
    },
    //dev server config
    devServer: {
        inline: true,
    },
    //default mode is production
    mode: 'development',
    // loader configurations
    module: {
        rules: [
            //babel loader
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    // plugin configuration
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'public'), to: 'public' }]),
    ],
};
