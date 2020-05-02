const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            //CSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, options: {
                            esModule: true,
                        }
                    },
                    'css-loader',
                    /*  'postcss-loader',
                     'sass-loader', */
                ],
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin(), new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',

        })
    ]
});