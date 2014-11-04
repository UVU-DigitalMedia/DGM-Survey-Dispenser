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

router.route('/')
  .post(
    auth.hasAccess('admin'),
    function (req, res, next) {
      Question.create(req.body).then(function (question) {
        res.json({
          success: true,
          question: question
        });
      }, function (err) {
        res.json({
          success: false,
          err: err.message
        });
      });
    }
  );

module.exports = router;
