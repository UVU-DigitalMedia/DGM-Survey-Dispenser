'use strict';

var User   = require('mongoose').model('User');
var router = require('express').Router();

/**
 * @api {post} /v1/auth/login Log a user in
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiExample Example usage:
 *    POST /v1/auth/login
 *    {
 *      "email": "email@email.com",
 *      "password": "password"
 *    }
 *
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {Object} user The user object.
 * @apiSuccess {String} user.id The user's unique id.
 * @apiSuccess {String} user.email The user's email.
 * @apiSuccess {String} user.role The user's role.
 * @apiSuccess {Date} user.createdAt The date the user was created.
 * @apiSuccess {Date} user.updatedAt The date the user was updated.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "user": {
 *        "id": "the-unique-id",
 *        "email": "example@email.com",
 *        "role": "user",
 *        "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
 *        "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
 *      }
 *    }
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": false,
 *      "error": "Incorrect Password"
 *    }
 *
 *   HTTP/1.1 200 OK
 *    {
 *      "success": false,
 *      "error": "Max Attempts"
 *    }
 */
router.post('/login', function (req, res, next) {
  User.authenticate(req.body.email, req.body.password).then(function (user) {
    // Check for failed attempts
    switch (user) {
      case User.reasons.NOT_FOUND:
      case User.reasons.PASSWORD_INCORRECT:
        return res.json({success: false, error: 'Incorrect Password'});
      case User.reasons.MAX_ATTEMPTS:
        return res.json({success: false, error: 'Max Attempts'});
    }
    // Login successful
    req.session.user = user.reduce();
    req.session.save(function (err) {
      /* istanbul ignore if: session should always be saving */
      if (err) { return next(err); }
      res.json({success: true, user: req.session.user});
    });
  }, next); // TODO do some error checking in the catch callback for the login
});

/**
 * @api {post} /v1/auth/logout Log a user out
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiExample Example usage:
 *    POST /v1/auth/logout
 *
 * @apiSuccess {Boolean} success When the request is successful.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true
 *    }
 */
router.all('/logout', function (req, res, next) {
  req.session.destroy(function(err) {
    /* istanbul ignore if: session should always be being destroyed */
    if (err) { return next(err); }
    res.json({success: true});
  });
});

/**
 * @api {get} /v1/auth/roles Get the user role information
 * @apiName Roles
 * @apiGroup Auth
 *
 * @apiExample Example usage:
 *    GET /v1/auth/roles
 *
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {String[]} roles The possible user roles
 * @apiSuccess {Object} accessLevels The access levels. Each key is an access
 *   level, and the values are arrays of user roles.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "roles": ["user", "admin"],
 *      "accessLevels": {
 *        "user": ["user", "admin"],
 *        "admin": ["admin"]
 *      }
 *    }
 */
router.get('/roles', function (req, res, next) {
  res.json({
    success: true,
    roles: User.roles,
    accessLevels: User.accessLevels
  });
});

/**
 * @api {post} /v1/auth/request-reset Request a password reset
 * @apiName RequestReset
 * @apiGroup Auth
 *
 * @apiExample Example usage:
 *    POST /v1/auth/request-reset
 *    {
 *      "email": "email@email.com"
 *    }
 *
 * @apiSuccess {Boolean} success When the request is successful.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true
 *    }
 */
router.post('/request-reset', function (req, res, next) {
  User.requestPasswordReset(req.body.email).then(function (info) {
    res.json({success: true}); // TODO check for email error checking
  }, next); // TODO do some catch error checking
});

/**
 * @api {post} /v1/auth/reset-password Reset a user's password
 * @apiName ResetPassword
 * @apiGroup Auth
 *
 * @apiExample Example usage:
 *    POST /v1/auth/request-reset
 *    {
 *      "email": "email@email.com",
 *      "token": "the-token-given-from-the-email",
 *      "password": "the-new-password"
 *    }
 *
 * @apiSuccess {Boolean} success When the request is successful.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true
 *    }
 */
router.post('/reset-password', function (req, res, next) {
  User.resetPassword(
    req.body.token,
    req.body.email,
    req.body.password
  ).then(function (user) {
    res.json({success: Boolean(user)});
  }, next); // TODO do some catch error checking
});

module.exports = router;
