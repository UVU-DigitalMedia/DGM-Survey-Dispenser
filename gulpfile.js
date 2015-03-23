'use strict';

var gulp = require('gulp-task-master')('gulp/tasks');

gulp.task('default', ['build']);

gulp.task('build', [
  'static',
  'styles',
  'webpack'
]);

gulp.task('watch', [
  'static.watch',
  'styles.watch',
  'webpack.watch',
  'livereload'
]);
