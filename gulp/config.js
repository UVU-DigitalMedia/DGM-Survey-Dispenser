'use strict';

var webpack    = require('gulp-webpack-build');

module.exports = {
  src: './src',
  dest: './public',
  webpackOptions: {
    debug: true,
    devtool: '#source-map',
    watchDelay: 200
  },
  webpackConfig: {
    useMemoryFs: true,
    progress: true
  },
  configFilename: webpack.config.CONFIG_FILENAME
};
