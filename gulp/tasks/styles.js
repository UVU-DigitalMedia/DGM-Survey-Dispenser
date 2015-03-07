'use strict';

var path       = require('path');
var gulp       = require('gulp');
var less       = require('gulp-less');
var please     = require('gulp-pleeease');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');
var plumber    = require('gulp-plumber');
var config     = require('../config');

module.exports = function () {
  gulp.src(path.join(config.src, 'less', 'index.less'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(concat('app.min.css'))
      .pipe(please())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(path.join(config.dest, 'css')));
};

module.exports.watch = path.join(config.src, 'less', '**', '*.less');
