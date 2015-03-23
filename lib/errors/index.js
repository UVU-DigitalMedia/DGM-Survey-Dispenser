'use strict';
/**
 * @module lib/errors
 * @description Creates an object of new Error types to be used in account
 * verification and such.
 *
 * @requires core:util
 */

var util = require('util');

module.exports = function errors(errs) {
  return Object.keys(errs).reduce(function (errorHash, errName) {
    errorHash[errName] = function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(errs[errName]);
      this.message = util.format.apply(null, args);
      this.name = errName;
    };
    errorHash[errName].prototype = Object.create(Error.prototype);
    return errorHash;
  }, {});
};
