const { injectBabelPlugin } = require('react-app-rewired')
const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');

/* config-overrides.js */
module.exports = {
  webpack (config, env) {
    config = rewireMobX(config, env);
    config = injectBabelPlugin('transform-decorators-legacy', config)

    config.resolve = {
      extensions: ['.js', '.jsx'],
      'alias': {
        'lib': path.join(__dirname, './lib'),
        'view': path.join(__dirname, './src/view'),
        'model': path.join(__dirname, './src/model'),
        'router': path.join(__dirname, './src/router')
      }
    };
    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
    oneOf.forEach((item) => {
      if (String(item.test) == String(/\.(js|jsx|mjs)$/)) {
        item.options.presets = ['es2015-node5', 'stage-2', 'react'];
      }
    })
    return config;
  },
  jest (config) {
    return config;
  },
  devServer (configFunction) {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      // 这个配置是webpack提供的另一种功能 适合vagrant共享目录下开发
      // aggregateTimeout 为 delay 意为300毫秒之后没有修改才会进行刷新
      // poll 为每1000毫秒检查一次 的确很消耗性能 非vagrant共享目录下开发请关闭
      // 时间可以酌情添加
      config.watchOptions.aggregateTimeout = 300;
      config.watchOptions.poll = 1000;
      return config;
    };
  }
};