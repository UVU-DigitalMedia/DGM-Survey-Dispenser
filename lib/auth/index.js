'use strict';
/**
 * @module lib/auth
 * @description provides authentication middleware using passport, basicAuth
 *
 * @requires npm:passport
 * @requires npm:passport-http
 * @requires model/user
 */

var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User          = require('../../models/user');

passport.use(new BasicStrategy(function (email, password, done) {
  User.authenticate(email, password)
    .then(done.bind(null, null))
    .catch(User.errors.NotFound, User.errors.WrongPassword, function () {
      done(null, false);
    })
    .catch(done);
}));

var auth = {};

auth.loggedIn = passport.authenticate('basic', {session: false});

auth.hasRole = function () {
  var roles = Array.prototype.slice.call(arguments);
  return function (req, res, next) {
    if (!req.user) { return next(new auth.errors.Unauthorized()); }
    if (roles.indexOf(req.user.role)) {
      return next(new auth.errors.Forbidden());
    }
    return next();
  };
};

auth.errors = {
  Unauthorized: function Unauthorized() {
    this.message = 'You must loggin to access this endpoint';
  },
  Forbidden: function Forbidden() {
    this.message = 'You do not have the access level to access this endpoint';
  }
};
// Make them all Error prototype
Object.keys(auth.errors).forEach(function (errorName) {
  auth.errors[errorName].prototype = Object.create(Error.prototype);
});
