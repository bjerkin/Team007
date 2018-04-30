const webpack = require('webpack');
var autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const JavaScriptObfuscator = require("webpack-obfuscator");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var isProduction = (process.env.NODE_ENV === 'production');
const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

module.exports = {
	cache : true,
	entry : {
		polyfills : './src/polyfills.ts',
		vendor : './src/vendor.ts',
		app : './src/main.ts'
	},
	output : {
		path : __dirname + "/dist",
		publicPath : isDevServer ? "http://localhost:8080/" : "",
		filename : 'js/[name].js',
		chunkFilename : "js/[name]" + /*(isProduction ? '-[chunkhash:8]' : '') + */ ".js"
	},
	devServer : {
		hot : true,
		inline : true,
		historyApiFallback : false,
		headers : {
			"Access-Control-Allow-Origin" : "*",
			"Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers" : "X-Requested-With, content-type, Authorization"
		}
	},
	devtool : isDevServer ? 'source-map' : false,
	module : {
		rules : [
			{
				// this fix System.import() deprecated
				test : /\.js$/,
				parser: {
					system: true,
				},			
			},
			{
				test : /\.ts$/,
				loaders : [{
						loader : 'awesome-typescript-loader',
						options : {
							configFileName : './tsconfig.json'
						}
					}, 'angular2-template-loader'
				]
			}, {
				test : /\.html$/,
				loader : 'html-loader'
			}, {
				test : /\.(scss|css)$/,
				//exclude: [/src/],			
				use : [
					MiniCssExtractPlugin.loader, {
						loader : "css-loader",
						options : {
							sourceMap : !isProduction,
							minimize : {
								safe : false
							}
						}
					}, {
						loader : "postcss-loader",
						options : {
							autoprefixer : {
								browsers : ["last 2 versions"]
							},
							plugins : () => [
								autoprefixer
							]
						},
					}, {
						loader : "sass-loader",
						options : {}
					}
				]
			}, 	
			{
				loader : 'url-loader?limit=100000',
				test : /\.(png|woff|woff2|eot|ttf|svg)$/
			}

		]
	},
	optimization : {
		splitChunks : {
			cacheGroups : {
				commons : {
					test : /[\\/]node_modules[\\/]/,
					name : "vendor",
					chunks : "all"
				}

			}
		}
	},
	resolve : {
		extensions : ['.ts', '.js', '.css', '.less', '.scss']
	},
	plugins :
	[
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/\@angular(\\|\/)core(\\|\/)esm5/,
			__dirname + './src', // location of your src
		{}
			// a map of your routes
		),
		new MiniCssExtractPlugin({
			filename : "css/[name].css",
			chunkFilename : "css/[name].css"
		}),
		new webpack.DefinePlugin({
			'process.env' : {
				'ENV' : JSON.stringify(ENV)
			}
		}),
	]
}
/*
if (isProduction) {
module.exports.plugins.push(
new JavaScriptObfuscator({
rotateUnicodeArray : true
}, 'vendor.js'))
}
*/