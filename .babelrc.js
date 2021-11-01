const path = require('path');
const jsConfig = require('./jsconfig.json');

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['module-resolver', { root: [path.resolve(jsConfig.compilerOptions.baseUrl)] }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
