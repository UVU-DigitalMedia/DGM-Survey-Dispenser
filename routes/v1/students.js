'use strict';

var router    = module.exports = require('express').Router();
var Sequelize = require('sequelize');
var Student   = require('../../models/student');
var Question  = require('../../models/question');
var Choice    = require('../../models/choice');
var Answer    = require('../../models/answer');
var auth      = require('../../lib/auth');

function findOrCreateStudent(req, res, next) {
  Student
    .findOrCreate({
      where: {uvid: req.params.uvid},
      defaults: {uvid: req.params.uvid}
    })
    .spread(function (student) {
      req.student = student;
    })
    .then(next, next);
}

function findQuestion(req, res, next) {
  Question
    .findOne(req.params.qid)
    .then(function (question) {
      if (!question) { return next(new Question.errors.NotFound()); }
      req.question = question;
    })
    .then(next, next);
}

router.route('/:uvid/login')
  .post(
    findOrCreateStudent,
    function (req, res, next) {
      res.json(req.student.get());
    }
  );

router.route('/:uvid/question')
  .get(
    findOrCreateStudent,
    function (req, res, next) {
      Question
        .findAll({
          where: {
            active: true
          },
          order: [[{model: Choice, as: 'choices'}, 'id']],
          include: [{
            model: Choice,
            as: 'choices',
            include: [{
              model: Answer,
              as: 'answers'
            }]
          }]
        })
        .then(function (questions) {
          var studentId = req.student.id;
          questions = questions.filter(function (question) {
            return !question.choices.some(function (choice) {
              return choice.answers.some(function (answer) {
                return answer.StudentId === studentId;
              });
            });
          });
          if (!questions.length) { return res.end(); }
          var rand = Math.random() * (0, questions.length - 1);
          res.json(questions[rand]);
        });
    }
  );

router.route('/:uvid/answer/:qid')
  .post(
    findOrCreateStudent,
    findQuestion,
    function (req, res, next) {
      req.question.answer(req.student, req.body)
        .then(function () {
          res.status(204);
          res.end();
        })
        .catch(next);
    }
  );
