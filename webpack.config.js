let path = require('path');
let webpack = require('webpack');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin' );

module.exports = {
    entry: ['react-hot-loader/patch', __dirname + '/entry.js'],
    output: {
        path: __dirname + '/build', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        filename: 'js/[name].[hash:8].min.js'
    },
    resolve: {
        alias: {
            'migo-admin-react': path.resolve(__dirname, '../framework/modules/index.js'),
        }
    },
    devServer: {
        // contentBase: "", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    // devtool: 'eval-source-map',
    mode:'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader',
        },
            {
            test: /\.scss$/,
            loaders: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
        },
            {
                test:/\.(gif|png|jpg|woff|svg|ttf|eot)$/,//图片的处理
                use:[{
                    loader:'file-loader',
                    options: {
                        // limit:500000000,//当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
                        outputPath: "images/",// 指定打包后的图片位置
                        name:'[name].[ext]',//name:'[path][name].[ext]
                        publicPath:"../images/"
                        //publicPath:output,

                    }
                }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
        filename:'index.html',
        template:'index.html'
    }),
        new webpack.HotModuleReplacementPlugin()]
};