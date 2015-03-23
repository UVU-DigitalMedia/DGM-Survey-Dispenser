'use strict';

var fs      = require('fs');
var path    = require('path');
var jade    = require('jade');
var User    = require('../../models/User');
var router  = require('express').Router();
var appPath = path.resolve(__dirname, '..', '..', 'src', 'views', 'index.jade');
var roles   = User.roles;

var render  = jade.compile(fs.readFileSync(appPath, 'utf8'));

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/login');
});

router.use(function (req, res, next) {
  var locals = {};
  if (req.session.passport.user) {
    locals = {
      user: req.session.passport.user,
      roles: roles
    };
  }
  res.send(render(locals));
});

module.exports = router;
