/*
* @Author: mark
* @Date:   2017-03-01 15:30:19
* @Last Modified by:   Mark Eliasen
* @Last Modified time: 2017-11-30 15:51:05
*/
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client',
        path.join(__dirname, '../js/app.js'),
    ],
    mode: 'development',
    devtool: '#inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '../'),
    },
    output: {
        path: path.join(__dirname, '../'),
        publicPath: '/',
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 3,
                    name: 'commons',
                    enforce: true,
                },
            },
        },
    },
    resolve: {
        alias: {
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(scss|css)$/,
                loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap',
            },
            {
                test: /\.(png|jpe?g|gif|wav|mp3)$/,
                loader: 'file-loader',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {removeTitle: true},
                                {convertColors: {shorthex: false}},
                                {convertPathData: false},
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        // browser console on HMR updates
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            minimize: false,
        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
            inject: true,
        }),
    ],
};
