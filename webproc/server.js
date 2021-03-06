var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 6789 : process.env.PORT;

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
});

server.listen(6789, 'localhost', function(err, result) {
	if (err) {
		return console.log(err);
	}
	console.log('Listening at http://localhost:6789/');
});