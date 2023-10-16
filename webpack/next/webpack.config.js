const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = path.resolve(__dirname, '../../dist');

const PANEL_VIEWPORT = 375;

module.exports = (...args) => {
  // console.log('webpack args=', args);
  return {
    mode: 'development',
    entry: path.resolve('./src/panels-next/SmartSpeaker/panel-default/app.tsx'),
    output: {
      filename: 'index.js',
      path: outputPath,
    },
    devServer: {
      port: 9000,
      allowedHosts: 'all',
      hot: true,
      https: false,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
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
          // 更多信息请点击这里 https://webpack.js.org/guides/asset-modules/
          type: 'asset',
        },
        // {
        //   test: /\.svg$/,
        //   use: ['@svgr/webpack'],
        // }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'index.css' }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@src': path.resolve(__dirname, '../../src'),
        '@panels-next': path.resolve(__dirname, '../../src/panels-next'),
        '@underscore': path.resolve(__dirname, '../../src/vendor/underscore/index'),
        '@utillib': path.resolve(__dirname, '../../src/libs/utillib.ts'),
      },
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
};
