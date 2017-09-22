'use strict';

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: (! isProd)
});


module.exports = {

    entry: [
        './index.js',
    ],

    output: {
        path: path.resolve(__dirname, '__build__'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }, {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer("last 2 versions")]
                            }
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["./node_modules/", "./resources/scss/"]
                        }
                    }],

                    fallback: "style-loader"
                }),
            }, {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'resources'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:8].[ext]',
                        }
                    }
                ]
            }, {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },


    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            title: 'BYU ACM',
            filename: 'index.html',
        })
    ],


    devServer: {
        compress: false,
        port: 4000,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:4001'
            }
        },
        historyApiFallback: true,
        publicPath: 'http://localhost:4000/',
        contentBase: [
            path.join(__dirname, "__build__"),
            path.join(__dirname, 'resources')
        ]
    }



}