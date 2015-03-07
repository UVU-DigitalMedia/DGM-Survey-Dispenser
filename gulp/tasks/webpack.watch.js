'use strict';

var path    = require('path');
var gulp    = require('gulp');
var webpack = require('gulp-webpack-build');
var plumber = require('gulp-plumber');
var config  = require('../config');

module.exports = function () {
  gulp.watch((path.join(config.src, '**', '*'))).on('change', function (event) {
    if (event.type !== 'changed') { return; }
    gulp.src(event.path, {base: path.resolve(config.src)})
      .pipe(plumber())
      .pipe(webpack.closest(config.configFilename))
      .pipe(webpack.configure(config.webpackConfig))
      .pipe(webpack.overrides(config.webpackOptions))
      .pipe(webpack.watch(function (err, stats) {
        gulp.src(this.path, {base: this.base})
          .pipe(plumber())
          .pipe(webpack.proxy(err, stats))
          .pipe(webpack.format({
            verbose: true,
            version: false
          }))
          .pipe(gulp.dest(config.dest));
      }));
  });
};

module.exports.dependencies = ['webpack'];
