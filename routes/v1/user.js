'use strict';

var User   = require('mongoose').model('User');
var router = require('express').Router();
var auth   = require('rute')('middleware/auth');

router.route('/:id')
  /**
   * @api {get} /v1/user/:id Request User information
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id User's unique ID.
   * @apiSuccess {Boolean} success When the request is successful.
   * @apiSuccess {Object} user The user object.
   * @apiSuccess {String} user.id The user's unique id.
   * @apiSuccess {String} user.email The user's email.
   * @apiSuccess {String} user.role The user's role.
   * @apiSuccess {Date} user.createdAt The date the user was created.
   * @apiSuccess {Date} user.updatedAt The date the user was updated.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true,
   *       "user": {
   *         "id": "the-unique-id",
   *         "email": "example@email.com",
   *         "role": "user",
   *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
   *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
   *       }
   *     }
   */
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
  /**
   * @api {put} /v1/user/:id Update User information.
   * @apiName PutUser
   * @apiGroup User
   *
   * @apiExample Example usage:
   *    PUT /v1/user/the-users-unique-id
   *    {
   *      "email": "newemail@email.com",
   *      "role": "user",
   *      "password": "newPassword"
   *    }
   *
   * @apiParam {Number} id User's unique ID.
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
   */
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
  /**
   * @api {delete} /v1/user/:id Delete User information
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiParam {Number} id User's unique ID.
   * @apiSuccess {Boolean} success When the request is successful.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true
   *     }
   */
  .delete([
    auth.hasAccess('admin'),
    function (req, res, next) {
      User.findByIdAndRemove(req.param('id')).exec().then(function () {
        res.json({success: true});
      }, next); // TODO catch error handling
    }
  ]);

router.route('/')
  /**
   * @api {get} /v1/user?page=0&perPage=10 Request list of users
   * @apiName GetUsers
   * @apiGroup User
   *
   * @apiExample Example usage:
   *    GET /v1/user?page=2&perPage=25
   *
   * @apiSuccess {Boolean} success When the request is successful.
   * @apiSuccess {Object[]} users The user object.
   * @apiSuccess {String} users.id The user's unique id.
   * @apiSuccess {String} users.email The user's email.
   * @apiSuccess {String} users.role The user's role.
   * @apiSuccess {Date} users.createdAt The date the user was created.
   * @apiSuccess {Date} users.updatedAt The date the user was updated.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true,
   *       "users": [{
   *         "id": "the-unique-id",
   *         "email": "example@email.com",
   *         "role": "user",
   *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
   *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
   *       }]
   *     }
   */
  .get(
    auth.hasAccess('admin'),
    function (req, res, next) {
      var page     = req.query.page || 0;
      var perPage  = req.query.perPage || 10;
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
  /**
   * @api {post} /v1/user Create a new User.
   * @apiName PostUser
   * @apiGroup User
   *
   * @apiExample Example usage:
   *    POST /v1/user
   *    {
   *      "email": "newemail@email.com",
   *      "role": "user",
   *      "password": "newPassword"
   *    }
   *
   * @apiParam {Number} id User's unique ID.
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
   */
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
