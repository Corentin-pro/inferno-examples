const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.js');

module.exports = Object.assign(
	config,
	{
		mode: 'development',
		devtool: 'source-map', // compile source map to get better debug output (error file/line)
		cache: true, // caching already built files so unchanged files can be reuse when an other changes
		watch: true, // watch file change and automatically rebuild the application
		watchOptions: {
			ignored: /node_modules/ // avoid watching node_modules as it is usually huge, note that it can be useful when debugging packages
		},
		resolve: {
			// avoid warning caused by development mode (using dev inferno build)
			alias: { inferno: require.resolve('inferno/dist/index.dev.esm.js') }
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': { 'DEBUG': true } // set a DEBUG flag that can be used in the scripts
			})
		],
		// webpack-dev-server configuration
		devServer: {
			contentBase: path.join(__dirname),
			port: 8080,
			publicPath: '/public',
			historyApiFallback: true // Avoid Content Security Policy (not needed with a hashHistory)
		}
	}
);