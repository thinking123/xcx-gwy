const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  cliLogs: !prod,
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src'),
      'components': path.join(__dirname , 'src/components'),
      'store': path.join(__dirname , 'src/store/index.js'),
      'UI': path.join(__dirname , 'src/components/UI'),
      'icon': path.join(__dirname , 'static/icon'),
      'image': path.join(__dirname , 'static/image'),
      'utils': path.join(__dirname , 'src/common/utils.js'),
      'baseUI': path.join(__dirname , 'src/css/baseUI.scss'),
      'basePage': path.join(__dirname , 'src/css/basePage.scss'),
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  plugins: [],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

