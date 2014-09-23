'use strict';

var User   = require('mongoose').model('User');
var router = require('express').Router();
var auth   = require('rute')('middleware/auth');

router.route('/:id')
  // GET /v1/user/:id
  .get(
    // If the user is logged in and the requested id is the user, just return
    // the user
    function (req, res, next) {
      var user = req.session.user;
      if (!user || user.id !== req.param('id')) { return next(); }
      res.json({success: true, user: user});
    },
    // Must have admin access to continue
    auth.hasAccess('admin'),
    // Get the user
    function (req, res, next) {
      User.findById(req.param('id')).exec().then(function (user) {
        if (!user) { return next(); }
        res.json({success: true, user: user.reduce()});
      }, next); // TODO catch error handling
    }
  )
  // PUT /v1/user/:id
  .put([
    function (req, res, next) {
      var user = req.session.user;
      if (!user || user.id !== req.param('id')) { return next(); }
      User.findById(req.param('id')).exec().then(function (user) {
        // TODO check for no user
        // Not using findByIdAndUpdate because it might not hash the password.
        // TODO check that
        if (req.body.email) { user.email = req.body.email; }
        if (req.body.password) { user.password = req.body.password; }
        // Only admins have access to change roles.
        if (req.body.role && user.hasAccess('admin')) {
          user.role = req.body.role;
        }
        user.save(function (err, user) {
          if (err) { return next(err); }
          // update the session with the new data
          req.session.user = user.reduce();
          req.session.save(function (err) {
            if (err) { return next(err); }
            res.json({
              success: true,
              user: req.session.user
            });
          });
        });
      }, next); // TODO catch error handling
    },
    auth.hasAccess('admin'),
    function (req, res, next) {
      User.findById(req.param('id')).exec().then(function (user) {
        // TODO check for no user
        if (req.body.email) { user.email = req.body.email; }
        if (req.body.password) { user.password = req.body.password; }
        if (req.body.role) { user.role = req.body.role; }
        user.save(function (err, user) {
          if (err) { return next(err); }
          res.json({
            success: true,
            user: user.reduce()
          });
        });
      }, next); // TODO catch error handling
    }
  ])
  // DELETE /v1/user/:id
  .delete([
    auth.hasAccess('admin'),
    function (req, res, next) {
      User.findByIdAndRemove(req.param('id')).exec().then(function () {
        res.json({success: true});
      }, next); // TODO catch error handling
    }
  ]);

router.route('/')
  // GET /v1/user
  .get(
    auth.hasAccess('admin'),
    function (req, res, next) {
      var page     = req.body.page || 0;
      var perPage  = req.body.perPage || 10;
      var offset   = page * perPage;
      var getUsers = User.find({}).skip(offset).limit(perPage).exec();
      getUsers.then(function (users) {
        res.json({
          success: true,
          users: users.map(function (user) {
            return user.reduce();
          })
        });
      }, next); // TODO catch error handling
    }
  )
  // POST /v1/user
  .post(
    auth.hasAccess('admin'),
    function (req, res, next) {
      User.create({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }).then(function (user) {
        res.json({
          success: true,
          user: user.reduce()
        });
      }, next); // TODO catch error handling
    }
  );

module.exports = router;
