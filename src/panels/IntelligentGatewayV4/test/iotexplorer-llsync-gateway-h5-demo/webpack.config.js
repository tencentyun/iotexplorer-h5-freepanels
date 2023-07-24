/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;
  const enableBundleAnalyzer = false;

  const publicPath = '/';

  return {
    devtool: isDevelopment && 'cheap-module-source-map',
    entry: {
      index: './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDevelopment ? '[name].js' : '[name].[contenthash:8].js',
      publicPath,
    },
    externals: {
      'qcloud-iotexplorer-h5-panel-sdk': 'h5PanelSdk',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development',
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: {
                  filter: (url) => {
                    if (url.includes('codicon.ttf')) {
                      return false;
                    }
                    return true;
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[contenthash:8].[ext]',
            },
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash:8].css',
        chunkFilename: isDevelopment ? '[name].chunk.css' : '[name].chunk.[contenthash:8].css',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      }),
      new CleanWebpackPlugin(),
      enableBundleAnalyzer && !isProduction && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              comparisons: false,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
      ],
      splitChunks: false,
    },
    devServer: {
      hot: false,
      compress: true,
      historyApiFallback: true,
      open: false,
      client: {
        overlay: true,
      },
    },
    stats: 'minimal',
  };
};
