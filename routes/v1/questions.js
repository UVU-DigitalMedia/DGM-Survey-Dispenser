'use strict';

var router   = module.exports = require('express').Router();
var Question = require('../../models/question');
var Choice   = require('../../models/choice');
var Answer   = require('../../models/answer');
var auth     = require('../../lib/auth');

router.route('/types', function (req, res, next) {
  res.json(Question.types);
});

router.route('/')
  .all(auth.loggedIn, auth.hasRole('admin', 'user'))
  /**
   * @api {get} /api/v1/questions Read Questions
   * @apiGroup Question
   *
   * @apiPermission admin
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200 OK
   *     [{
   *
   *     }]
   */
  .get(function (req, res, next) {
    Question
      .findAll({
        include: [{
          model: Choice,
          as: 'Choices',
          include: [{
            model: Answer,
            as: 'Answers'
          }]
        }]
      })
      .then(function (questions) {
        res.json(questions);
      })
      .catch(next);
  })
  /**
   * @api {post} /api/v1/questions Create Question
   * @apiGroup Question
   *
   * @apiPermission admin
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 201
   *     location: /api/v1/questions/2435
   */
  .post(function (req, res, next) {
    var choices = req.body.choices;
    delete req.body.choices;
    Question
      .create(req.body)
      .then(function (question) {
        return question.attachChoices(choices);
      })
      .then(function (question) {
        res.status(201);
        res.location(req.originalUrl + '/' + question.id);
        res.end();
      })
      .catch(next);
  })
  ;

router.route('/:id')
  .all(
    auth.loggedIn,
    auth.hasRole('admin', 'user'),
    function (req, res, next) {
      req.params.id = parseInt(req.params.id, 10) || null;
      next();
    }
  )
  /**
   * @api {get} /api/v1/questions/:id Read Question
   * @apiGroup Question
   *
   * @apiPermission admin
   * @apiPermission user
   * @apiPermission (user can only get self, not other questions)
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 1,
   *       "email": "test@email.com",
   *       "role": "admin"
   *     }
   */
  .get(function (req, res, next) {
    Question
      .findOne(req.params.id, {
        include: [{
          model: Choice,
          as: 'Choices',
          include: [{
            model: Answer,
            as: 'Answers'
          }]
        }]
      })
      .then(function (question) {
        if (!question) { return next(); }
        res.status(200);
        res.json(question);
      })
      .catch(next);
  })
  /**
   * @api {put} /api/v1/questions/:id Update Question
   * @apiGroup Question
   *
   * @apiPermission admin
   * @apiPermission user
   * @apiPermission (user can only update self, not other questions)
   * @apiPermission (user cannot update role)
   *
   * @apiParam {String} email    Must be a valid email
   * @apiParam {String} password Must be between 8 and 64 characters
   * @apiParam {String} role     Must be one of the roles at /api/v1/questions
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 204
   */
  .put(function (req, res, next) {
    req.body.id = req.params.id;
    Question
      .update(req.body, {where: {id: req.params.id}})
      .then(function (user) {
        res.status(204);
        res.end();
      })
      .catch(next);
  })
  /**
   * @api {delete} /api/v1/questions/:id Delete Question
   * @apiGroup Question
   *
   * @apiPermission admin
   *
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 204
   */
  .delete(function (req, res, next) {
    Question
      .destroy({
        where: {id: req.params.id},
        limit: 1
      })
      .then(function (rowsAffected) {
        if (rowsAffected) {
          res.status(204);
          return res.end();
        }
        next();
      })
      .catch(next);
  })
  ;

