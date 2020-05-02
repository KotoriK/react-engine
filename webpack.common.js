const path = require('path');

module.exports = {
    //入口点
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'app.js'
    },// Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        //处理规则
        rules: [
            //Typescript
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,  //对这个不做处理
                loader: 'awesome-typescript-loader',
            },

            //组件的静态资源
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'   // 路径
                        }
                    }
                ]
            }, {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'   // 路径
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
       

        // 提出公共模块
        /*  new webpack.optimize.CommonsChunkPlugin({
             name: 'common',   // 公共模块名
             filename: 'js/base.js'  // 打包的目录
         }) */
    ]
};