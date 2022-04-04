const argv = require('minimist')(process.argv.slice(2));
const get = key => argv[key] || process.env[`npm_config_${key}`] || '';
const getVal = (keys = []) => keys.map(key => get(key));
const [panel, category, preview, mode] = getVal(['panel', 'category', 'preview', 'mode']);
const underLine = str => str.replace(/([A-Z])/g, '-$1').replace(/^-/, '')
  .toLowerCase();
const isDev = mode === 'development';

const themePaths = ['panel-card', 'panel-cold', 'panel-fresh', 'panel-house', 'panel-brunet'];

const isRemPath = (filePath, remPaths) => {
  for (let i = 0; i < remPaths.length; i++) {
    if (filePath.match(remPaths[i])) return true;
  }
  return false;
};


module.exports = {
  autoPreFixer: isDev ? undefined : { overrideBrowserslist: ["last 5 version", ">1%", "ie >=8"] },
  isRem: (build, viewport) => {
    const path = build._module.resource.replace(/\\/g, "/").replace(/\.less$/, '.tsx');
    // console.log('rem---', viewport[path], isRemPath(path, themePaths), build._module.resource);
    return isRemPath(path, themePaths);
  },
  env: {
    theme: `theme-${panel.split('-')[1]}`,
    app: underLine(category),
    panel,
    isDev,
    category,
    isPreview: !!preview,
  },
  postcss: {
    rootValue: 37.5, // 112.5
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

