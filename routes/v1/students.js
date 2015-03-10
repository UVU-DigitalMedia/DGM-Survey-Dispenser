'use strict';

var router  = module.exports = require('express').Router();
var Student = require('../../models/student');
var auth    = require('../../lib/auth');

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

router.route('/:uvid/login')
  .post(
    findOrCreateStudent,
    function (req, res, next) {
      res.json(req.student.get());
    }
  );
