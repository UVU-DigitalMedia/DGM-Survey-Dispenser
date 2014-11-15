'use strict';

var path   = require('path');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();
var config = require('configly').setConfig(path.join(__dirname, 'config'));


// gulp
// ====
gulp.task('default', ['watch']);

// gulp build
// ==========
gulp.task('build', [
  'styles',
  'scripts',
  'views',
  'static',
  'fonts'
]);

// gulp watch
// ==========
gulp.task('watch', [
  'watch.styles',
  'watch.scripts',
  'watch.views',
  'watch.static',
  'nodemon',
  'livereload'
]);

// gulp styles
// ===========
var styles = config.get('build.styles');
gulp.task('styles', function () {
  return gulp.src(styles.lib.concat(styles.src))
    .pipe($.sourcemaps.init())
      .pipe($.less({ paths: styles.inc }))
      .pipe($.concat(styles.file))
      .pipe($.pleeease())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(styles.dest));
});
gulp.task('watch.styles', ['styles'], function () {
  gulp.watch(styles.src, ['styles']);
});

// gulp scripts
// ============
var scripts = config.get('build.scripts');
gulp.task('scripts', function () {
  return gulp.src(scripts.lib.concat(scripts.src))
    .pipe($.sourcemaps.init())
      .pipe($.ngAnnotate())
      .pipe($.concat(scripts.file))
      .pipe($.uglify())
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest(scripts.dest));
});
gulp.task('watch.scripts', ['scripts'], function () {
  gulp.watch(scripts.src, ['scripts']);
});

// gulp views
// ==========
var views = config.get('build.views');
gulp.task('views', function () {
  return gulp.src(views.src)
    .pipe($.jade({ locals: views.locals }))
    .pipe(gulp.dest(views.dest));
});
gulp.task('watch.views', ['views'], function () {
  gulp.watch(views.src, ['views']);
});

// gulp static
// ===========
//
// gulp fonts
// ==========
var staticOpts = config.get('build.static');
var fonts = config.get('build.fonts');
gulp.task('static', function () {
  return gulp.src(staticOpts.src)
    .pipe(gulp.dest(staticOpts.dest));
});
gulp.task('fonts', function () {
  return gulp.src(fonts.src)
    .pipe(gulp.dest(fonts.dest));
});
gulp.task('watch.static', ['static', 'fonts'], function () {
  gulp.watch(staticOpts.src, ['static']);
});

// gulp livereload
// ===============
var livereload;
var reloadOps = config.get('build.livereload');
gulp.task('livereload', function () {
  livereload = $.livereload({silent: true});
  gulp.watch(reloadOps.dest + '/**/*').on('change', function (file) {
    livereload.changed(file.path);
  });
});

// gulp nodemon
// ============
var nodemon = config.get('build.nodemon');
gulp.task('nodemon', function () {
  $.nodemon(nodemon).on('restart', function () {
    setTimeout(livereload.changed, 500);
  });
});

// gulp docs
// =========
gulp.task('docs', function () {
  var app = require('express')();
  app.use(require('express').static('doc'));
  app.listen(8000, function () {
    console.log('API docs served on http://localhost:8000');
  });
});
