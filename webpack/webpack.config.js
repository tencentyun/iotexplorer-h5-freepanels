const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

class ModifiedMiniCssExtractPlugin extends MiniCssExtractPlugin {
	getCssChunkObject(mainChunk) {
		return {}
	}
}

module.exports = (env, argv) => {
	const { mode } = env;
	const { category, panel } = argv;

	if (!category || !panel) {
		throw new Error('请指定需要调试的面板，如：npm run dev -- --category=socket --panel=panel-default');
	}

	const isDevMode = mode === 'development';
	const rootPath = path.join(__dirname, '../src');

	const moduleName = `${category}__${panel}`;

	const entryDir = `panels/${category}/${panel}`;

	const distRoot = path.join(__dirname, '../dist', isDevMode ? '/debug' : '/release');

	const outputPath = path.join(distRoot, entryDir);

	// 当 JS 文件大小超过 2MB 限制时，可置为 true 开启 webpack 的代码拆分
	// 开启后 npm run release 将输出多个文件，需要全部上传到控制台交互开发的设置项中
	// 具体设置项在 optimization.splitChunks
	const enableCodeSplitting = false;

	// console.log('srcPath', srcPath);
	// console.log('distPath', distPath);

	return {
		name: 'iot-explorer-h5-panel-sdk-demo',
		mode,
		entry: {
			[moduleName]: path.join(rootPath, entryDir, 'app.tsx'),
		},
		output: {
			path: outputPath,
			filename: '[name].js',
			libraryTarget: 'umd'
		},
		devServer: {
			contentBase: outputPath,
			compress: true,
			port: 9000,
			disableHostCheck: true, //  新增该配置项
			// hot: true,
			https: true,
		},
		module: {
			// 现在的 babel 配置已经很简单了，我们只需要加入默认的配置即可
			rules: [
				{
					test: /\.(j|t)sx?$/,
					exclude: /node_modules|vendors/,
					use: {
						loader: 'babel-loader',
						options: {
							sourceType: 'unambiguous',
							presets: ['@babel/preset-env', '@babel/preset-react',],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								// [
								// 	'@babel/plugin-transform-runtime',
								// 	{
								// 		'absoluteRuntime': false,
								// 		'corejs': false,
								// 		'helpers': true,
								// 		'regenerator': true,
								// 		'useESModules': false,
								// 	}
								// ],
							]
						},
					}
				},
				{
					loader: "ts-loader",
					options: {
						// exclude: [
						// 	"node_modules",
						// ]
						transpileOnly: true,
						// compilerOptions: {
						// 	module: "esnext",
						// 	sourceMap: true,
						// },
					},
				},
				{
					test: /\.(le|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
              options: {
                url: true,
              }
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									require('autoprefixer')(),
									require('postcss-pxtorem')({
										rootValue: 46.875,
										propList: ['*'],
									}),
								],
							},
						},
						{
							loader: 'less-loader',
						},
					],
				},
				{
					test: /\.svg$/,
					use: [
						"url-loader",
						"svg-transform-loader",
						{
							loader: "svgo-loader",
							options: {
								plugins: [{ removeTitle: true }, { convertStyleToAttrs: true }],
							},
						},
					],
				},
			],
		},
		resolve: {
			// 添加 jsx 后缀支持
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			alias: {
				'@src': path.resolve(__dirname, '../src'),
				'@components': path.resolve(__dirname, '../src/components'),
				'@hooks': path.resolve(__dirname, '../src/hooks'),
				'@utillib': path.resolve(__dirname, '../src/libs/utillib.ts'),
				'@libs': path.resolve(__dirname, '../src/libs'),
				"@constants": path.resolve(__dirname, '../src/constants/index.ts'),
				'@icons': path.resolve(__dirname, '../src/assets'),
				'@underscore': path.resolve(__dirname, '../src/vendor/underscore/index'),
				'@wxlib': path.resolve(__dirname, '../src/libs/wxlib/index.js'),
			},
		},
		devtool: isDevMode ? 'inline-source-map' : 'inline-nosources-source-map',
		optimization: enableCodeSplitting && !isDevMode ?
			{
				splitChunks: {
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/](react|react-dom|qcloud-iotexplorer-h5-panel-sdk)[\\/]/,
							name: 'vendor',
							chunks: 'all',
						}
					}
				}
			} : {},
		plugins: [
			new webpack.ProgressPlugin(),
			new CleanWebpackPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			new ModifiedMiniCssExtractPlugin({
				filename: '[name].css',
			}),
			// new OptimizeCSSAssetsPlugin({
			// 	cssProcessorOptions: {
			// 		discardComments: { removeAll: true },
			// 		autoprefixer: { disable: true },
			// 	},
			// }),
			// new BundleAnalyzerPlugin(),
			// new CopyPlugin([
			//   {
			//     from: path.join(srcPath, '/project.config.json'),
			//     to: path.join(distPath, '/project.config.json'),
			//   },
			//   {
			//     from: path.join(srcPath, '/plugin/plugin.json'),
			//     to: path.join(distPath, '/plugin'),
			//   },
			//   {
			//     from: path.join(srcPath, '/doc'),
			//     to: path.join(distPath, '/doc'),
			//   },
			//   {
			//     from: path.join(srcPath, '/miniprogram'),
			//     to: path.join(distPath, '/miniprogram'),
			//   },
			// ]),
		],
		stats: { children: false },
	};
};
