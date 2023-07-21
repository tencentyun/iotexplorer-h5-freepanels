module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3.20',
        useBuiltIns: 'usage',
        targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [],
};
