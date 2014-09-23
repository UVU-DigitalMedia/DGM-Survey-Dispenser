'use strict';

// middleware/auth
// ===============
//
//     var auth = require('rute')('middleware/auth')

var User = require('mongoose').model('User');

// auth.hasAccess(accessLevel)
// ---------------------------
//
// middleware used to restrict user access to certain endpoints.
//
// ### Parameters
//
// * `accessLevel` (String) - The access level to allow access. Must be one of
// the values given in /config/user.js
//
// ### Returns
//
// A middleware function that will allow a logged in user access if their role
// matches the accessLevel given
function hasAccess(accessLevel) {
  return function (req, res, next) {
    // Get the user from the session data.
    var user = req.session.user;
    // If the user's role has access to the given accessLevel, continue to the
    // next piece of middleware
    if (user && User.roleHasAccess(user.role, accessLevel)) { return next(); }
    // otherwise, return access denied
    res.status(403).json({
      success: false,
      error: 'Unauthorized'
    });
  };
}

module.exports = {
  hasAccess: hasAccess
};
