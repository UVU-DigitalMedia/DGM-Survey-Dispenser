'use strict';

var router = module.exports = require('express').Router();
var User   = require('../../models/User');
var auth   = require('../../lib/auth');

function reduce(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role
  };
}

router.route('/login')
  .post(
    auth.loggedIn,
    function (req, res, next) {
      res.json(reduce(req.user));
    }
  );

router.route('/logout')
  .post(function (req, res, next) {
    next(new auth.errors.Unauthorized());
  });

router.route('/roles')
  .get(
    auth.loggedIn,
    function (req, res, next) {
      res.json(User.roles);
    }
  );

router.route('/')
  .get(
    auth.loggedIn,
    auth.hasRole('admin'),
    function (req, res, next) {
      User
        .findAll()
        .then(function (users) {
          res.json(users.map(reduce));
        })
        .catch(next);
    }
  )
  .post(
    auth.loggedIn,
    auth.hasRole('admin'),
    function (req, res, next) {
      User
        .create(req.body)
        .then(function (user) {
          res.status(201);
          res.location(req.originalUrl + '/' + user.id);
          res.end();
        })
        .catch(next);
    }
  )
  ;

router.route('/:id')
  .all(
    auth.loggedIn,
    function (req, res, next) {
      req.params.id = parseInt(req.params.id, 10) || null;
      next();
    }
  )
  .get(
    function (req, res, next) {
      if (req.user.role === 'admin') {
        return next();
      }
      if (req.user.id === req.params.id) {
        return next();
      }
      next(new auth.errors.Forbidden());
    },
    function (req, res, next) {
      User
        .findOne(req.params.id)
        .then(function (user) {
          if (!user) { return next(); }
          res.status(200);
          res.json(reduce(user));
        })
        .catch(next);
    }
  )
  .put(
    function (req, res, next) {
      if (req.user.role === 'admin') { return next(); }
      if (req.user.id === req.params.id) {
        if (req.body.role && req.user.role !== req.body.role) {
          return next(new auth.errors.Forbidden());
        }
        return next();
      }
      next(new auth.errors.Forbidden());
    },
    function (req, res, next) {
      req.body.id = req.params.id;
      User
        .update(req.body, {where: {id: req.params.id}})
        .then(function (user) {
          res.status(204);
          res.end();
        })
        .catch(next);
    }
  )
  .delete(
    auth.hasRole('admin'),
    function (req, res, next) {
      User
        .destroy({
          where: {id: req.params.id},
          limit: 1
        })
        .then(function (rowsAffected) {
          if (rowsAffected) {
            res.status(204);
            res.end();
            return;
          }
          next();
        })
        .catch(next);
    }
  )
  ;