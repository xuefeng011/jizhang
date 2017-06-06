var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:6789',
        'webpack/hot/only-dev-server',
        './src/app'
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
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
    postcss: [autoprefixer({
        browsers: ['last 2 versions']
    })],
    eslint: {
        failOnWarning: true
    },
    resolve: {
        extensions: ['', '.web.js', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', './src/module', './src/action'],
        alias: {
            'co': path.join(__dirname, './src/util/co')
        }
    }
};