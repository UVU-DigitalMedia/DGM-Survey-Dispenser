'use strict';

var path    = require('path');
var gulp    = require('gulp');
var webpack = require('gulp-webpack-build');
var plumber = require('gulp-plumber');
var config  = require('../config');

var srcPath = path.join(config.src, '**', config.configFilename);

module.exports = function () {
  return gulp.src(srcPath, {base: path.resolve(config.src)})
    .pipe(plumber())
    .pipe(webpack.configure(config.webpackConfig))
    .pipe(webpack.overrides(config.webpackOpeions))
    .pipe(webpack.compile())
    .pipe(webpack.format({
      version: false,
      timings: true
    }))
    .pipe(webpack.failAfter({
      errors: true,
      warnings: true
    }))
    .pipe(gulp.dest(config.dest));
};
