const { injectBabelPlugin, getLoader } = require('react-app-rewired')

const path = require("path")
module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', 
      [{
        libraryName: 'antd-mobile',
        style: 'css'
      }, {
        libraryName: 'antd',
        style: 'css'
      }]
    ],
    config
  )
  config = injectBabelPlugin('transform-decorators-legacy', config)

  config.resolve = {
    extensions: ['.js', '.jsx'],
    'alias': {
      'part': path.join(__dirname, "./src/part"),
      'page': path.join(__dirname, "./src/page"),
      'action': path.join(__dirname, "./src/reducers/actions")
    }
  }

  const cssLoader = getLoader(
    config.module.rules,
    rule => rule.test && String(rule.test) === String(/\.css$/)
  );

  const stylusLoader = {
    test: /\.styl$/,
    use: [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]_[hash:base64:8]'
        }
      }, {
        loader: 'stylus-loader'
      }
    ]
  }

  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
  oneOf.unshift(stylusLoader)
  return config
};