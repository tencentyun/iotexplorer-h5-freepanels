/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const md5 = require('md5');


module.exports = {
  input: [
    'src/**/*.{ts,tsx}',
    '!src/locales/**',
    '!src/styles/**',
    '!**/node_modules/**',
  ],
  output: './', // 输出目录
  options: {
    debug: false,
    sort: true,
    func: false,
    trans: false,

    defaultLng: 'zh',
    defaultNs: 'resources',
    lngs: ['zh', 'en'],
    ns: ['resources'],
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
    },
    removeUnusedKeys: true, // 移除未使用的 key
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    // pluralFallback: false,
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
    metadata: {},
    allowDynamicKeys: false,
  },
  transform: function customTransform(file, enc, done) {
    ('use strict');

    const { parser } = this;
    const content = fs.readFileSync(file.path, enc);

    // 指定扫描的标识
    parser.parseFuncFromString(content, { list: ['lang', 't'] }, (key) => {
      const hashKey = md5(key); // 此处将key转化md5
      parser.set(hashKey, {
        defaultValue: key,
      });
    });

    done();
  },
};
