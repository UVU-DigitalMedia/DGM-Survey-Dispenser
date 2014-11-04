'use strict';

var router  = require('express').Router();
var Student = require('mongoose').model('Student');

router.param('uvid', function (req, res, next, uvid) {
  Student.findBy({uvid: uvid}).exec()
    .then(function (student) {
      if (student) { return student; }
      return Student.create({uvid: uvid});
    })
    .then(function (student) {
      req.student = student;
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

module.exports = router;
