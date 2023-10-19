const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require('webpack-merge');

const outputPath = path.resolve(__dirname, '../dist');

const getNpmConfigArg = (key) => process.env[`npm_config_${key}`];

const category = getNpmConfigArg('category');
const panel = getNpmConfigArg('panel');

module.exports = (env, { mode }) => {
  const PANEL_VIEWPORT = 375;

  const getBundleEntry = () => {
    switch (mode) {
      case 'development': {
        const panelEntry = path.resolve(__dirname, `../src/panels-next/${category}/${panel}/app.tsx`);
        if (!fs.existsSync(panelEntry)) {
          throw new Error(`面板入口不存在，请检查。 ${panelEntry}`);
        }
        return panelEntry;
      }
      case 'production': {
        // 生成多入口打包
        const panelEntry = path.resolve(__dirname, `../src/panels-next/${category}/${panel}/app.tsx`);
        if (!fs.existsSync(panelEntry)) {
          throw new Error(`面板入口不存在，请检查。 ${panelEntry}`);
        }
        return panelEntry;
      }
    }
  };

  const commonConfig = {
    mode: 'development',
    entry: getBundleEntry(),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: (loaderContext) => {
                  let viewportWidth = PANEL_VIEWPORT;
                  if (loaderContext.resourcePath.includes('node_modules/antd-mobile')) {
                    viewportWidth = 375;
                  }
                  return {
                    plugins: [
                      'postcss-preset-env',
                      require('autoprefixer'),
                      [
                        'postcss-px-to-viewport-8-plugin',
                        {
                          unitToConvert: 'px',
                          viewportWidth,
                          unitPrecision: 5,
                          propList: ['*'],
                          viewportUnit: 'vw',
                          fontViewportUnit: 'vw',
                          selectorBlackList: [],
                          minPixelValue: 1,
                          mediaQuery: false,
                          replace: true,
                          exclude: undefined,
                          include: undefined,
                        },
                      ],
                    ],
                  };
                },
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: 'asset',
        },
      ],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@src': path.resolve(__dirname, '../src'),
        '@panels-next': path.resolve(__dirname, '../src/panels-next'),
        '@underscore': path.resolve(__dirname, '../src/vendor/underscore/index'),
        '@utillib': path.resolve(__dirname, '../src/libs/utillib.ts'),
        '@libs': path.resolve(__dirname, '../src/libs'),
      },
    },
  };

  const developmentConfig = {
    mode: 'development',
    output: {
      filename: 'index.js',
    },
    devServer: {
      port: 9000,
      allowedHosts: 'all',
      hot: true,
      https: false,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'index.css',
      }),
    ],
  };

  const productionConfig = {
    mode: 'production',
    output: {
      filename: `${category}_${panel}.[contenthash:10].js`,
      path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
      new CssMinimizerPlugin(),
      new MiniCssExtractPlugin({
        filename: `${category}_${panel}.[contenthash:10].css`,
      }),
    ],
  };

  switch (mode) {
    case 'development': {
      return merge(commonConfig, developmentConfig);
    }
    case 'production': {
      return merge(commonConfig, productionConfig);
    }
    default: {
      throw new Error('Not matching configuration was found!');
    }
  }
};
