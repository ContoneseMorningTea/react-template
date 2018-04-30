const { injectBabelPlugin, getLoader } = require('react-app-rewired')
const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');

const cssLoaderMatcher = rule => rule.loader && rule.loader.indexOf(`css-loader`) != -1;

/* config-overrides.js */
module.exports = {
  webpack (config, env) {
    config = rewireMobX(config, env);

    config.resolve = {
      extensions: ['.js', '.jsx'],
      'alias': {
        '@': path.join(__dirname, './src/components'),
        'lib': path.join(__dirname, './lib'),
        'view': path.join(__dirname, './src/view'),
        'model': path.join(__dirname, './src/model'),
        'store': path.join(__dirname, './src/store')
      }
    };

    // 增加css module的支持
    const cssRules = getLoader(config.module.rules, rule => rule.test && String(rule.test) === String(/\.css$/));
    cssRules.test = /\.s?css$/;
    const cssLoader = getLoader(cssRules.use || cssRules.loader, cssLoaderMatcher);
    cssLoader.options = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    };
    
    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
    oneOf.forEach((item) => {
      if (String(item.test) == String(/\.(js|jsx|mjs)$/)) {
        // 支持es6的class TODO: 关注babel升级 是否有一天就不用这么做了？
        if (env == 'production') {
          item.options.presets = [
            ["env", {
              "modules": false,
              "include": ['transform-es2015-classes'],
              "targets": {
                "browsers": "last 2 chrome versions",
                "node": "current"
              }
            }],
            'stage-0',
            'react',
          ];
          console.log(item.options.plugins);
        }
        else {
          item.options.presets = ['es2015-node5', 'stage-0', 'react'];
        }
      }
    });
    
    oneOf.unshift({
      test: /\.css$/,
      resourceQuery: /^\?raw$/,
      use: [require.resolve("style-loader"), require.resolve("css-loader")]
    });
    
    return config;
  },
  jest: config => config,
  devServer (configFunction) {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      // 这个配置是webpack提供的另一种功能 适合vagrant共享目录下开发
      // aggregateTimeout 为 delay 意为1000毫秒之后没有修改才会进行刷新
      // poll 为每5000毫秒检查一次 的确很消耗性能 非vagrant共享目录下开发请关闭
      // 时间可以酌情添加
      config.watchOptions.aggregateTimeout = 1000;
      config.watchOptions.poll = 5000;
      return config;
    };
  }
};