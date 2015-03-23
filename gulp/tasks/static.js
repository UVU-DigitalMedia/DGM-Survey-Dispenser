'use strict';

var path    = require('path');
var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var config  = require('../config');

var src    = path.join(config.src, 'static', '**', '*');

module.exports = function () {
  gulp.src(src).pipe(plumber()).pipe(gulp.dest(config.dest));
};

module.exports.watch = src;
