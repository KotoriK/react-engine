const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    module: {
        rules: [
            //CSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, options: {
                            esModule: true,
                            hmr: true,
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true,
                        }
                    },
                    'css-loader',
                    /* 'postcss-loader',
                    'sass-loader', */
                ],
            },
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public',
        port: 1234
    }, plugins: [//生成独立css
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',

        })]
});