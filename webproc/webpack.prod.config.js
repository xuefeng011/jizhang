var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeModulesPath = path.join(__dirname, '/node_modules/');


var webpath = path.resolve('../public/web/');
var distpath = path.join(__dirname, '/dist/');


var fs = require('fs'); // 引入fs模块  

function deleteall(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse  
                deleteall(curPath);
            } else { // delete file  
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteall(webpath);


module.exports = {
    devtool: false,
    entry: {
        bundle: './src/app.js'
    },
    output: {
        path: webpath,
        filename: '[name]-[hash:5].min.js',
        chunkFilename: '[name]-[hash:5].chunk.js',
        publicPath: './'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: 'body',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('[name]-[hash:5].min.css'),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('./dist/dll/vendor-manifest.json')
        // })
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                plugins: [
                    ["transform-runtime", {
                        polyfill: false
                    }],
                    ["import", [{
                        "style": "css",
                        "libraryName": "antd-mobile"
                    }]]
                ],
                presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.less$/,
            exclude: [/node_modules/],
            loader: 'style-loader!css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]!resolve-url!less'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            include: path.join(__dirname, 'src'),
            loaders: [
                'url?limit=10000&name=img/[hash:8].[name].[ext]' // 图片小于8k就转化为 base64, 或者单独作为文件
            ]
        }, {
            test: /\.(svg)$/i,
            loader: 'svg-sprite',
            include: [
                require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
                // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
            ]
        }]
    },
    resolve: {
        extensions: ['', '.web.js', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', './src/module', './src/action'],
        alias: {
            'co': path.join(__dirname, './src/util/co')
        }
    },
    postcss: [
        require('autoprefixer')
    ]
};