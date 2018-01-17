const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);

  config.resolve = {
    extensions: ['.js', '.jsx'],
    'alias': {
      'view': path.join(__dirname, './src/view'),
      'model': path.join(__dirname, './src/model'),
      'router': path.join(__dirname, './src/router')
    }
  };
  return config;
}