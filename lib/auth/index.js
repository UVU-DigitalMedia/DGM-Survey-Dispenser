'use strict';
/**
 * @module lib/auth
 * @description provides authentication middleware using passport, basicAuth
 *
 * @requires npm:passport
 * @requires npm:passport-http
 * @requires lib/errors
 * @requires model/user
 */

var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var errors        = require('../errors');
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

auth.errors = errors({
  Unauthorized: 'You must loggin to access this endpoint',
  Forbidden: 'You do not have the access level to access this endpoint'
});
