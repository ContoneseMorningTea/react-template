const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);

  config.resolve = {
    extensions: ['.js', '.jsx'],
    'alias': {
      'model': path.join(__dirname, './src/model')
    }
  };
  return config;
}