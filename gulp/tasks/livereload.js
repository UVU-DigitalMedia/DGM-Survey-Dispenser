'use strict';

var path         = require('path');
var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var config       = require('../config');

module.exports = function () {
  livereload.listen();
  gulp.watch(path.join(config.dest, '**', '*')).on('change', function (event) {
    livereload.changed(event.path);
  });
};
