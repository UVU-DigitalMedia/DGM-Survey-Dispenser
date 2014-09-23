'use strict';

var glob     = require('glob');
var path     = require('path');
var mongoose = require('mongoose');
var PATTERN          = path.resolve(__dirname, '../models/*.js');
var LOWERCASE_DASHES = /^[a-z\-]+$/;

// Loop through all of the schema modules
glob.sync(PATTERN).map(function (modulePath) {
  var schemaModule = require(modulePath);
  var basename     = path.basename(modulePath, path.extname(modulePath));

  // If the schema module isn't a mongoose Schema or the filename doesn't only
  // contain lowercase letters and dashes, then skip out
  if (!(schemaModule instanceof mongoose.Schema) ||
      !LOWERCASE_DASHES.test(basename)) {
    return;
  }

  // Make a CamelCase name from the model filename
  var name = basename
    .split('-')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1);
    })
    .join('');

  mongoose.model(name, schemaModule);
});
