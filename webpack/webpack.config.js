/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const panelConfig = require('./panel-conf');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const autoPreFixer = require('autoprefixer');
const postcss = require('postcss-pxtorem');
const plugin = require('./plugin');
const viewportConfig = require('./pxToViewport.config');
const argv = require('minimist')(process.argv.slice(2));
const category = argv.category || process.env.npm_config_category || '';

class ModifiedMiniCssExtractPlugin extends MiniCssExtractPlugin {
  getCssChunkObject(mainChunk) {
    return {};
  }
}

module.exports = (env, argv) => {
  const { mode } = argv;
  const isDevMode = mode === 'development';
  const { isPreview } = plugin.env;
  const rootPath = path.join(__dirname, '../');
  const srcPath = path.join(rootPath, 'src');
  const outputPath = path.join(
    rootPath,
    'dist',
    isDevMode ? 'debug' : 'release',
  );

  const entry = {};

  Object.keys(panelConfig).forEach((categoryKey) => {
    const { enable, panels, viewportWidth } = panelConfig[categoryKey];
    // console.log('build is DevEnv: ', isDevMode, ', build length:', panels.length);
    if (
      enable
      && panels
      && panels.length
      && ((category && categoryKey === category) || (!category && !isDevMode)) //
    ) {
      if (viewportWidth) {
        viewportConfig.viewportWidth = viewportWidth;
      }
      panels.forEach((panelInfo) => {
        let panelName;
        const options = { enable: true, entry: 'app.tsx' };

        if (typeof panelInfo === 'string') {
          panelName = panelInfo;
        } else if (panelInfo.splice) {
          const [_name, _options] = panelInfo;
          panelName = _name;
          Object.assign(options, _options);
        }
        // console.log('build panelInfo -->', panelName);
        if (options.enable) {
          entry[`${categoryKey}_${panelName}`] = path.join(
            srcPath,
            'panels',
            `${categoryKey}/${panelName}`,
            options.entry,
          );
        }
      });
    }
  });
  console.log('entry list length --->', Object.keys(entry).length);
  return {
    name: 'iotexplorer-h5-freepanels',
    mode,
    entry,
    output: {
      path: outputPath,
      filename: (isDevMode || isPreview) ? '[name].js' : '[name].[contenthash:10].js',
      libraryTarget: 'umd',
      asyncChunks: true,
      clean: true,
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'qcloud-iotexplorer-h5-panel-sdk': 'h5PanelSdk',
    },
    devServer: {
      // contentBase: outputPath,
      compress: true,
      port: 9000,
      // disableHostCheck: true, //  新增该配置项
      // hot: true,
      https: true,
      static: {
        directory: path.join(__dirname, outputPath),
      },
      open: true,
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
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: true,
                    regenerator: false,
                    useESModules: false,
                  },
                ],
                ['babel-plugin-styled-components-px2vw', viewportConfig],
                // antd 按需引入
                [
                  'import',
                  {
                    libraryName: 'antd-mobile',
                    libraryDirectory: 'es/components',
                    style: 'false',
                  },
                ],
              ],
            },
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-px-to-viewport')(viewportConfig),
                  autoPreFixer(),
                ],
              },
            },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     ident: 'postcss',
            //     plugins: isDevMode ? [] : [
            //       autoPreFixer(plugin.autoPreFixer),
            //       postcss(plugin.postcss)
            //     ],
            //   },
            // },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.svg$/,
          exclude: [path.resolve(__dirname, '../src/assets/themes')],
          use: [
            'url-loader',
            'svg-transform-loader',
            {
              loader: 'svgo-loader',
              options: {
                plugins: [{ removeTitle: true }, { convertStyleToAttrs: true }],
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          include: [path.resolve(__dirname, '../src/assets/themes')],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]',
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
        '@constants': path.resolve(__dirname, '../src/constants/index.ts'),
        '@icons': path.resolve(__dirname, '../src/assets'),
        '@underscore': path.resolve(
          __dirname,
          '../src/vendor/underscore/index'
        ),
        '@wxlib': path.resolve(__dirname, '../src/libs/wxlib/index.js'),
        '@custom': path.resolve(__dirname, '../src/components/custom'),
        '@router': path.resolve(__dirname, '../src/components/custom/Router'),
        '@utils': path.resolve(__dirname, '../src/libs/utils.ts'),
        '@theme': path.resolve(__dirname, '../src/styles/theme'),
        '@svg': path.resolve(__dirname, plugin.svg),
      },
    },
    devtool: isDevMode || isPreview ? 'eval-source-map' : false,
    optimization: isPreview || !isDevMode ? {
      chunkIds: 'named',
      minimize: !isDevMode,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    } : {},
    plugins: [
      new webpack.ids.HashedModuleIdsPlugin(),
      new webpack.ProgressPlugin(),
      (isDevMode || isPreview) && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ _env_: JSON.stringify(plugin.env) }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new ModifiedMiniCssExtractPlugin({
        filename: (isDevMode || isPreview) ? '[name].css' : '[name].[contenthash:10].css',
      }),
    ].filter(Boolean),
    // stats: { children: false },
  };
};
