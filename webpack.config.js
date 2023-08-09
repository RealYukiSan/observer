const path = require("path")
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "production",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "chrome-ext"),
    filename: "[name].js"
  },
  module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{from: ".", to: ".", context: "public"}]
		}),
	],
}