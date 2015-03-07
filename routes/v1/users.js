'use strict';

var router = module.exports = require('express').Router();
var auth   = require('../../lib/auth');

router.route('/login')
  .post(
    auth.loggedIn,
    function (req, res, next) {
      res.json({
        id: req.user.get('id'),
        role: req.user.get('role')
      });
    }
  );

router.route('/logout')
  .post(function (req, res, next) {
    next(new auth.errors.Unauthorized());
  });
