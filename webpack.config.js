const path = require("path")
const webpack = require("webpack")
const version = require("./version")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ScriptPlugin = require("script-ext-html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const BUILD = process.env.BUILD || "build"
const CONFIG = process.env.CONFIG
const isDev = CONFIG == "dev"

console.log("\n\n")
console.log(`\x1b[32m\x1b[1m You are ${isDev ? "running devserver." : `building app.`}\x1b[0m`)
if (!isDev) {
	switch(BUILD) {
		case "build": 
			console.log(`\x1b[32m\x1b[1m Increasing build... \x1b[0m`)
			version.inc()
			break
		case "minor": 
			console.log(`\x1b[32m\x1b[1m Increasing MINOR version... \x1b[0m`)
			version.incMinor()
			break
		case "major": 
			console.log(`\x1b[32m\x1b[1m Increasing MAJOR version, congrats! :) \x1b[0m`)
			version.incMajor()
			break
	}
	console.log(`\x1b[32m\x1b[1m Version has been successfully increased. The app version is now ${version.v()} \x1b[0m`)
}
console.log("\n\n")


var config = {
	mode: isDev ? "development" : "production",
	entry: {
		app: path.resolve(__dirname, "src/index.tsx")
	},
	output: isDev
		? {
			path: __dirname,
			filename: "dist/bundle.js",
			publicPath: "/"
		}
		: {
			path: path.resolve(__dirname, `dist/${version.v()}`),
			filename: `bundle.js`,
			publicPath: `/assets/${version.v()}/`,
		},

	...(isDev ? 
	{
		devtool: "eval-source-map",
		devServer: {
			historyApiFallback: true,
			hot: true,
		},
	} : {}),

	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/,
				loader: "awesome-typescript-loader",
				exclude: /node_modules\/(?!superagent)/
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.(svg|woff|woff2|ttf|otf|png|jpg)$/,
				include: [
					path.resolve(__dirname, "node_modules"),
					path.resolve(__dirname, "src"),
				],
				loader: "url-loader",
				query: {
					limit: 1000,
					name: `${version.v()}.[name].[ext]`
				}
			},
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.worker\.js$/,
				use: {
					loader: "worker-loader",
					options: {
						name: `[name].js`,
					}
				}
			},
			{
				test: /\.(sa|c)ss$/,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							includePaths: [
								path.resolve(__dirname, "src")
							]
						}
					}
				]
			},
		]
	},
	resolve: {
		modules: [
			"node_modules",
			path.resolve(__dirname, "src"),
		],
		extensions: [".js", ".jsx", ".sass", ".json", ".css", ".ts", ".tsx"]
	},
	performance: {
		hints: "warning",
		maxAssetSize: 20000000000,
		maxEntrypointSize: 40000000000
	},
	parallelism: 2,
	plugins: [
		// new BundleAnalyzer(),
		new webpack.DefinePlugin({
			"ENV": JSON.stringify(CONFIG),
			"process.env.VERSION": JSON.stringify(version.v()),
			"process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production")
		}),
		...(!isDev ? [
			new UglifyJsPlugin({
				exclude: [/\.(min|worker)\.js$/gi],
				uglifyOptions: {
					ie8: false,
					mangle: true,
					output: {
						comments: false,
						beautify: false
					}
				}
			}),
			new HtmlWebpackPlugin({
				template: "index.ejs",
				filename: "index.html",
				_script: `<script>window.__APP_VERSION__ = "${version.v()}"</script>`,
				_title: "${__rh-title}",
				_meta: "${__rh-meta}",
				_link: "${__rh-link}",
				_htmlAttributes: "${__rh-htmlAttributes}",
				_bodyAttributes: "${__rh-bodyAttributes}",
				_body: "${__body}"
			}),
			new MiniCssExtractPlugin({
				filename: `style.css`
			}),
			new ScriptPlugin({
				defaultAttribute: "async"
			}),
		] : []),
	],
}

module.exports = config