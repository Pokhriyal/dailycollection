// const { injectBabelPlugin } = require('react-app-rewired');

//   module.exports = function override(config, env) {
//     config = injectBabelPlugin(
//     ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
//     config,
//     );
//     return config;
//   };




const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
    config = injectBabelPlugin(
  //  ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
      config,
    );
    config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#0039db" },
    javascriptEnabled: true,
    })(config, env);
    return config;
  };