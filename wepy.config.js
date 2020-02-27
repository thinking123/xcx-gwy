const path = require('path');
const DefinePlugin = require('@wepy/plugin-define');
const SrcPlugin = require('wepy-image-src-pre-prefix-plugin');

const prod = process.env.NODE_ENV === 'production';
const CDN = 'https://qiniu.kaimingwutong.com/';
module.exports = {
  wpyExt: '.wpy',
  cliLogs: !prod,
  build: {},
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src'),
      components: path.join(__dirname, 'src/components'),
      store: path.join(__dirname, 'src/store/index.js'),
      UI: path.join(__dirname, 'src/components/UI'),
      Custom: path.join(__dirname, 'src/components/Custom'),
      icon: path.join(__dirname, 'static/icon'),
      image: path.join(__dirname, 'static/image'),
      utils: path.join(__dirname, 'src/common/utils.js'),
      baseUI: path.join(__dirname, 'src/css/baseUI.scss'),
      lessUI: path.join(__dirname, 'src/css/var.less'),
      basePage: path.join(__dirname, 'src/css/basePage.scss'),
      baseCss: path.join(__dirname, 'src/css/base.scss'),
      newBase: path.join(__dirname, 'src/css/newBase.scss')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules'],

    extensions: ['.wpy', '.js', '.scss', '.less']
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
      presets: ['@babel/preset-env'],
      plugins: [
        '@wepy/babel-plugin-import-regenerator',
        '@babel/plugin-proposal-class-properties'
      ]
    }
  },
  plugins: [
    DefinePlugin({
      BASE_URL: JSON.stringify('https://www.kaimingwutong.com/'),
      // 'process.env.NODE_ENV': 'development',
      // 'typeof window': JSON.stringify('undefined'),
      DEV: true,
      CDN: JSON.stringify(CDN)
    }),
    SrcPlugin({
      ext: 'png',
      baseUrl: CDN
    })
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
};
