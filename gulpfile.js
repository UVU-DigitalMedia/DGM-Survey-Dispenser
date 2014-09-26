'use strict';

var path   = require('path');
var gulp   = require('gulp');
var p      = require('gulp-load-plugins')();
var lib    = require('bower-files')({
  join: {fonts: ['eot', 'svg', 'ttf', 'woff']}
});
var pkg    = require('./package');

// paths
// =====
//
// Here is an object hash with all of the paths that we need to worry about in
// our various build processes.
var options = {
  styles: {
    src: [
      'src/styles/**/*.less',
      '!src/styles/inc/**'
    ],
    concat: 'app-' + pkg.version + '.min.css',
    dest: 'public/css/'
  },
  scripts: {
    src: ['src/scripts/**/*.js'],
    concat: 'app-' + pkg.version + '.min.js',
    dest: 'public/js/'
  },
  static: {
    src: ['src/static/**'],
    dest: 'public/'
  },
  views: {
    src: [
      'src/views/**/*.jade',
      '!src/views/inc/**'
    ],
    locals: {
      jsPath: '/js/app-' + pkg.version + '.min.js',
      cssPath: '/css/app-' + pkg.version + '.min.css'
    },
    dest: 'public/'
  },
  livereload: {
    publicDir: 'public'
  },
  nodemon: {
    script: 'index.js',
    ext: 'js',
    ignore: [
      'bower_components/**',
      'node_modules/**',
      'public/**',
      'src/**',
      'gulpfile.js'
    ]
  }
};

// gulp styles
// ===========
gulp.task('styles', function () {
  var src = (lib.css || []).concat(options.styles.src);
  return gulp.src(src)
    .pipe(p.less({ paths: path.join(__dirname, 'src/styles/inc') }))
    .pipe(p.concat(options.styles.concat))
    .pipe(p.autoprefixer())
    .pipe(p.csso())
    .pipe(gulp.dest(options.styles.dest));
});
gulp.task('watch.styles', ['styles'], function () {
  gulp.watch(options.styles.src, ['styles']);
});

// gulp scripts
// ============
gulp.task('scripts', function () {
  var src = (lib.js || []).concat(options.scripts.src);
  return gulp.src(src)
    .pipe(p.ngAnnotate())
    .pipe(p.concat(options.scripts.concat))
    .pipe(p.uglify())
    .pipe(gulp.dest(options.scripts.dest));
});
gulp.task('watch.scripts', ['scripts'], function () {
  gulp.watch(options.scripts.src, ['scripts']);
});

// gulp views
// ==========
gulp.task('views', function () {
  return gulp.src(options.views.src)
    .pipe(p.jade({ locals: options.views.locals }))
    .pipe(gulp.dest(options.views.dest));
});
gulp.task('watch.views', ['views'], function () {
  gulp.watch(options.views.src, ['views']);
});

// gulp static
// ===========
//
// gulp fonts
// ----------
gulp.task('static', function () {
  return gulp.src(options.static.src)
    .pipe(gulp.dest(options.static.dest));
});
gulp.task('fonts', function () {
  return gulp.src(lib.fonts || []).pipe(gulp.dest('public/fonts'));
});
gulp.task('watch.static', ['static', 'fonts'], function () {
  gulp.watch(options.static.src, ['static']);
});

// gulp livereload
// ===============
var livereload = p.livereload();
gulp.task('livereload', function () {
  gulp.watch(options.livereload.publicDir + '/**')
    .on('change', function (file) {
      livereload.changed(file.path);
    });
});

// gulp nodemon
// ============
gulp.task('nodemon', function () {
  p.nodemon(options.nodemon)
    .on('restart', function () {
      setTimeout(livereload.changed, 500);
      //livereload.changed();
    });
});

// gulp default
// ============
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

// gulp
// ====
gulp.task('default', ['watch']);
