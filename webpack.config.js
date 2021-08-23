const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {

  const backend_url = argv.mode === 'production'
    ? 'https://favoriteblogs.herokuapp.com'
    : 'http://localhost:3001'

		const asset_path = argv.mode === 'production'
		? 'https://favoriteblogs.herokuapp.com/'
		: '/'
	
	const devtool = argv.mode === 'production'
		? false
		: 'eval-source-map'

  return {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    // Where files should be sent once they are bundled
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: asset_path,
			chunkFilename: "[name].js"
    },
		// resolve: {
		// 	alias: {
		// 		Containers: path.resolve(__dirname, 'src/components/container'),
		// 		Presentationals: path.resolve(__dirname, 'src/components/presentational'),
		// 		Pages: path.resolve(__dirname, 'src/components/pages'),
		// 		Forms: path.resolve(__dirname, 'src/components/forms'),
		// 		Reducers: path.resolve(__dirname, 'src/reducers'),
		// 		Hooks: path.resolve(__dirname, 'src/hooks'),
		// 		Lib: path.resolve(__dirname, 'src/lib'),
		// 		Services: path.resolve(__dirname, 'src/services'),
		// 		Assets: path.resolve(__dirname, 'src/assets') 
		// 	}
		// },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
      port: 3000,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      open: true,
      clientLogLevel: 'silent',
      hot: true,
      historyApiFallback: true
    },
    devtool: devtool,
		experiments: {
			topLevelAwait: true
		},
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
					resolve: {
						extensions: [".js", ".jsx"]
					},
          use: [{
            loader: 'babel-loader',
          }]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            }
          ]
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        },
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				}
      ]
    },
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						chunks: "all"
					}
				}
			}
		},
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        title: 'Favorite Blogs',
        favicon: './src/img/favicon.png'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          BACKEND_URL: JSON.stringify(backend_url),
        },
      }),
		],
  }
}

module.exports = config
