'use strict';

var path = require('path');
var pkg  = require('../package');
var lib  = {};
/*require('bower-files')({
  join: {fonts: ['eot', 'woff', 'svg', 'ttf']}
});*/

module.exports = {
  styles: {
    lib: lib.css || [],
    src: [
      'src/styles/**/*.less',
      '!src/styles/inc/**'
    ],
    inc: path.resolve(__dirname, '../', 'src/styles/inc'),
    file: 'app-' + pkg.version + '.min.css',
    dest: 'www/css/'
  },
  scripts: {
    lib: [],
    src: [
      'src/scripts/**/*.js'
    ],
    file: 'app-' + pkg.version + '.min.js',
    dest: 'www/js/'
  },
  static: {
    src: ['src/static/**'],
    dest: 'www/'
  },
  fonts: {
    src: lib.fonts || [],
    dest: 'www/fonts/'
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
    dest: 'www/'
  },
  livereload: {
    dest: 'www'
  },
  nodemon: {
    script: 'index.js',
    ext: 'js',
    ignore: [
      'bower_components/**',
      'www/**',
      'src/**',
      'gulpfile.js'
    ]
  }
};
