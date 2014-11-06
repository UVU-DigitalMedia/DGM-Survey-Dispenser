'use strict';

var router  = require('express').Router();
var Student = require('mongoose').model('Student');
var Answer  = require('mongoose').model('Answer');
var auth   = require('rute')('middleware/auth');

router.param('uvid', function (req, res, next, uvid) {
  Student.findOne({uvid: uvid}).exec()
    .then(function (student) {
      if (student) { return student; }
      return Student.create({uvid: uvid});
    })
    .then(function (student) {
      req.student = student;
      next();
    }, next);
});

router.post('/:uvid/login', function (req, res) {
  req.session.student = req.student;
  req.session.save(function (err) {
    if (err) { return next(err); }
    res.json({
      success: true,
      student: req.session.student
    });
  });
});

router.get('/current', function (req, res) {
  res.json({
    success: Boolean(req.session.student),
    student: req.session.student
  });
});

router.post('/logout', function (req, res) {
  delete req.session.student;
  req.session.save(function (err) {
    if (err) { return next(err); }
    res.json({ success: true });
  });
});

router.route('/')
  .get(auth.hasAccess('admin'))
  .get(function (req, res, next) {
    Student.find({}).exec().then(function (students) {
      res.json({ success: true, students: students });
    }, next);
  });

router.route('/answer/:qid')
  .post(function (req, res, next) {
    if (!req.session.student) { return next(); }
    var student  = req.session.student._id;
    var question = req.param('qid');
    var value    = req.body.value;
    Answer.answer(student, question, value).then(function (answer) {
      if (!answer) {
        return res.json({ success: false, error: 'Question does not exist' });
      }
      return res.json({ success: true, answer: answer });
    });
  });

router.route('/:uvid')
  .delete(auth.hasAccess('admin'))
  .delete(function (req, res, next) {
    if (!req.student) { return next(); }
    req.student.remove(function () {
      res.json({ success: true });
    });
  });

module.exports = router;
