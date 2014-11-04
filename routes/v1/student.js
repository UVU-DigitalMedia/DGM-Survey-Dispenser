'use strict';

var router  = require('express').Router();
var Student = require('mongoose').model('Student');
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
  .get(
    auth.hasAccess('admin'),
    function (req, res, next) {
      Student.find({}).exec().then(function (students) {
        res.json({
          success: true,
          students: students
        });
      }, next);
    }
  );

router.route('/:uvid')
  .delete(
    auth.hasAccess('admin'),
    function (req, res, next) {
      if (!req.student) { return next(); }
      req.student.remove(function () {
        res.json({ success: true });
      });
    }
  );

module.exports = router;
