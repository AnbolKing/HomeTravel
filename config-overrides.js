// const { override, fixBabelImports } = require('customize-cra');
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: 'css',
//   }),
// );

const path = require("path");
const { override, 
  fixBabelImports, 
  addLessLoader, 
  addDecoratorsLegacy, 
  disableEsLint,
  addWebpackAlias
} = require('customize-cra');

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  addWebpackAlias({
    '@': path.resolve(__dirname, "./src")
  }),
  fixBabelImports('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',    
    style: true,
  }),
  fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: true
  }), 
  addLessLoader({
    javascriptEnabled: true,
  })
);