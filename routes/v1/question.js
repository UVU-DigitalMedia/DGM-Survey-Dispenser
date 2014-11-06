'use strict';

var router   = require('express').Router();
var Question = require('mongoose').model('StudentQuestion');
var auth     = require('rute')('middleware/auth');

router.get('/types', function (req, res, next) {
  res.json({
    success: true,
    type: Question.types
  });
});

router.use(auth.hasAccess('admin'));

router.param('id', function (req, res, next, id) {
  Question.findById(id).exec().then(function (question) {
    req.question = question;
    next();
  });
});

router.route('/:id')
  // GET /v1/question/:id
  .get(function (req, res, next) {
    if (!req.question) { return next(); }
    res.json({success: true, question: req.question});
  })
  // PUT /v1/question/:id
  .put(function (req, res, next) {
    if (!req.question) { return next(); }
    delete req.body._id;
    Object.keys(req.body).map(function (key) {
      req.question[key] = req.body[key];
    });
    req.question.save(function (err, question) {
      if (err) { return next(err); }
      res.json({success: true, question: question});
    });
  })
  // DELETE /v1/question/:id
  .delete(function (req, res, next) {
    if (!req.question) { return next(); }
    req.question.remove(function (err, question) {
      if (err) { return next(err); }
      res.json({success: true});
    });
  });

router.route('/')
  // GET /v1/question
  .get(function (req, res, next) {
    Question.find({}).exec().then(function (questions) {
      res.json({ success: true, questions: questions })
    });
  })
  // POST /v1/question
  .post(function (req, res, next) {
    Question.create(req.body).then(function (question) {
      res.json({ success: true, question: question });
    }, function (err) {
      res.json({ success: false, err: err.message });
    });
  });

module.exports = router;
