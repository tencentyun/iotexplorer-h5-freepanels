const argv = require('minimist')(process.argv.slice(2));
const get = key => argv[key] || process.env[`npm_config_${key}`] || '';
const getVal = (keys = []) => keys.map(key => get(key));
const [panel, category, preview, mode] = getVal(['panel', 'category', 'preview', 'mode']);
const underLine = str => str.replace(/([A-Z])/g, '-$1').replace(/^-/, '')
  .toLowerCase();
const isDev = mode === 'development';
module.exports = {
  autoPreFixer: isDev ? undefined : { overrideBrowserslist: ["last 5 version", ">1%", "ie >=8"] },
  env: {
    theme: `theme-${panel.split('-')[1]}`,
    app: underLine(category),
    panel,
    isDev,
    category,
    isPreview: !!preview,
  },
  postcss: {
    rootValue: 112.5,
    propList: ['*'],
    minPixelValue: 1,
    unitPrecision: 6,
    selectorBalckList: ['van'],
    replace: true,
    mediaQuery: false,
    // exclude: [/node_modules/],
  },
  svg: `../src/assets/svg/${category}/${panel}`,
};

