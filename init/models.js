'use strict';
/**
 * @module init/models
 * @description Initializes the application models. Reads the `models/`
 * directory to dynamically load new models
 *
 * @requires core:path
 * @requires core:fs
 * @requires npm:bluebird
 * @requires lib/log
 */

var path     = require('path');
var Promise  = require('bluebird');
var fs       = Promise.promisifyAll(require('fs'));
var log      = require('../lib/log');

// Directory where all of the models live.
var MODELS_DIR = path.resolve(__dirname, '..', 'models');

module.exports = function initModels() {
  log.debug('Loading models from %s', MODELS_DIR);
  log.debug('Finding files in %s', MODELS_DIR);

  return fs.readdirAsync(MODELS_DIR).then(function (files) {
    log.debug('Found %s items in %s', files.length, MODELS_DIR);

    // Loop through the files to require each one in our models
    files.map(function (file) {

      // Get the full path that we'll use when we require it.
      var fullPath  = path.join(MODELS_DIR, file);
      var extension = path.extname(file);

      // Non .js file (such as folders) will be excluded.
      /* istanbul ignore if: All files in `models/` should be .js files */
      if (extension !== '.js') {
        return log.debug('%s exluded from models, not a .js file', file);
      }

      // Load the actual model module
      log.debug('Loading model file from %s', fullPath);
      var model = require(fullPath);
      log.debug('Loaded model file from %s', fullPath);
      log.debug('Initialized "%s" model', model.name);

    });

    log.debug('Loaded models from %s', MODELS_DIR);
  });
};
