'use strict';

var User   = require('mongoose').model('User');
var router = require('express').Router();

// POST /v1/auth/login
//   email: 'example@email.com',
//   password: 'newPassword'
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

// {ALL} /v1/auth/logout
router.all('/logout', function (req, res, next) {
  req.session.destroy(function(err) {
    /* istanbul ignore if: session should always be being destroyed */
    if (err) { return next(err); }
    res.json({success: true});
  });
});

// GET /v1/auth/roles
router.get('/roles', function (req, res, next) {
  res.json({
    success: true,
    roles: User.roles,
    accessLevels: User.accessLevels
  });
});

// POST /v1/auth/request-reset
//   email: 'example@email.com'
router.post('/request-reset', function (req, res, next) {
  User.requestPasswordReset(req.body.email).then(function (info) {
    res.json({success: true}); // TODO check for email error checking
  }, next); // TODO do some catch error checking
});

// POST /v1/auth/reset-password
//   token: 'somerandomtokengiveninemail'
//   email: 'example@email.com'
//   password: 'myNewPassword'
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
