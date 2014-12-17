'use strict';

var router   = require('express').Router();
var mongoose = require('mongoose');
var Student  = mongoose.model('Student');
var Question = mongoose.model('StudentQuestion');
var Answer   = mongoose.model('StudentAnswer');
var auth     = require('rute')('middleware/auth');

router.param('uvid', function (req, res, next, uvid) {
  Student.findOne({uvid: uvid}).exec()
    .then(function (student) {
      if (student) { return student; }
      return Student.create({uvid: uvid});
    })
    .then(function (student) {
      req.student = {
        id: student.id,
        uvid: student.uvid,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
      };
      next();
    }, next);
});

/**
 * @api {post} /v1/student/:uvid/login Log a student in
 * @apiName StudentLogin
 * @apiGroup Student
 *
 * @apiParam {Number} id The Student's UVID
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {Object} student The student object.
 * @apiSuccess {String} student.id The student's unique id.
 * @apiSuccess {String} student.uvid The student's UVID
 * @apiSuccess {Date} student.createdAt The date the student was created.
 * @apiSuccess {Date} student.updatedAt The date the student was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "student": {
 *         "id": "the-unique-id",
 *         "uvid": "10283774",
 *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
 *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
 *       }
 *     }
 */
router.post('/:uvid/login', function (req, res, next) {
  req.session.student = req.student;
  req.session.save(function (err) {
    if (err) { return next(err); }
    res.json({
      success: true,
      student: req.session.student
    });
  });
});

/**
 * @api {get} /v1/student/current Get current logged in student
 * @apiName GetCurrentStudent
 * @apiGroup Student
 *
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {Object} student The student object.
 * @apiSuccess {String} student.id The student's unique id.
 * @apiSuccess {String} student.uvid The student's UVID
 * @apiSuccess {Date} student.createdAt The date the student was created.
 * @apiSuccess {Date} student.updatedAt The date the student was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "student": {
 *         "id": "the-unique-id",
 *         "uvid": "10283774",
 *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
 *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
 *       }
 *     }
 */
router.get('/current', function (req, res) {
  res.json({
    success: Boolean(req.session.student),
    student: req.session.student
  });
});

/**
 * @api {post} /v1/student/logout Log a student out
 * @apiName StudentLogout
 * @apiGroup Student
 *
 * @apiSuccess {Boolean} success When the request is successful.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 */
router.post('/logout', function (req, res, next) {
  delete req.session.student;
  req.session.save(function (err) {
    if (err) { return next(err); }
    res.json({ success: true });
  });
});

/**
 * @api {get} /v1/student/ Get list of all students
 * @apiName GetStudents
 * @apiGroup Student
 *
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {Object[]} students The students array.
 * @apiSuccess {String} students.id The student's unique id.
 * @apiSuccess {String} students.uvid The student's UVID
 * @apiSuccess {Date} students.createdAt The date the student was created.
 * @apiSuccess {Date} students.updatedAt The date the students was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "students": [{
 *         "id": "the-unique-id",
 *         "uvid": "10283774",
 *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
 *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
 *       }]
 *     }
 */
router.route('/').get(
  auth.hasAccess('admin'),
  function (req, res, next) {
    Student.find({}).exec().then(function (students) {
      res.json({
        success: true,
        students: students.map(function (student) {
          return {
            id: student._id,
            uvid: student.uvid,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt
          };
        })
      });
    }, next);
  }
);

/**
 * @api {post} /v1/student/answer/:qid Answer a question
 * @apiName StudentAnswerQuestion
 * @apiGroup Student
 *
 * @apiExample Example usage:
 *    POST /v1/student/answer/question-id
 *    {
 *      "value": "The value"
 *    }
 *
 * @apiParam {String} qid The id of the question being answered
 *
 * @apiSuccess {Boolean} success When the request is successful.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "answer": {
 *         "student": "the-student-id",
 *         "question": "the-question-id",
 *         "value": "the-answer"
 *       }
 *     }
 */
router.route('/answer/:qid').post(function (req, res, next) {
  if (!req.session.student) { return next(); }
  var student  = req.session.student.id;
  var question = req.param('qid');
  var value    = req.body.value;
  Answer.answer(student, question, value).then(function (answer) {
    if (!answer) {
      return res.json({ success: false, error: 'Question does not exist' });
    }
    return res.json({ success: true, answer: answer });
  });
});

/**
 * @api {get} /v1/student/question Get a random unanswered question to answer
 * @apiName StudentGetRandomQuestion
 * @apiGroup Student
 *
 * @apiExample Example usage:
 *    GET /v1/student/question
 *
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {Object} question The question object.
 * @apiSuccess {String} question._id The question's unique id
 * @apiSuccess {String} question.label The internally used question label
 * @apiSuccess {String} question.question The question to be asked to the
 *   student
 * @apiSuccess {String} question.type One of the question types referenced at
 *   "Get the question types"
 * @apiSuccess {Date} question.createdAt The date the question was created
 * @apiSuccess {Date} question.updatedAt the date the question was updated
 * @apiSuccess {Object[]} question.choices The choices for the question if
 *   applicable
 * @apiSuccess {String} question.choices.label The label for the choice, as
 *   displayed to the student
 * @apiSuccess {String} question.choices.key The value of the choice. If an
 *   "other" option is specified, this should be 'other'
 */
router.route('/question').get(
  function (req, res, next) {
    if (req.session.student) { return next(); }
    res.status(404).json({
      success: false,
      error: 'STUDENT NOT LOGGED IN'
    });
  },
  function (req, res, next) {
    var questions;
    Question.find({}).exec()
      // Get all of the answers that the student has a
      .then(function (allQuestions) {
        questions = allQuestions;
        return Answer.find({student: req.session.student.id}).exec();
      })
      // Flatten the array of answers to just the questions that have been
      // answered
      .then(function (studentAnswers) {
        return studentAnswers.map(function (answer) {
          return String(answer.question);
        });
      })
      // Filter through the list of questions and remove the ones that have
      // already been answered.
      .then(function (answeredQuestions) {
        return questions.filter(function (question) {
          return answeredQuestions.indexOf(String(question.id)) === -1;
        });
      })
      // Choose a random one and return it
      .then(function (unansweredQuestions) {
        var index = Math.floor(Math.random() * unansweredQuestions.length);
        return unansweredQuestions[index];
      })
      .then(function (randomQuestion) {
        res.json({
          success: true,
          question: randomQuestion
        });
      }, next);
  }
);

/**
 * @api {delete} /v1/student/:uvid Delete at student
 * @apiName DeleteStudent
 * @apiGroup Student
 *
 * @apiParam {Number} id The Student's UVID
 * @apiSuccess {Boolean} success When the request is successful.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 */
router.route('/:uvid').delete(
  auth.hasAccess('admin'),
  function (req, res, next) {
    if (!req.student) { return next(); }
    Student.findByIdAndRemove(req.student.id, function () {
      res.json({ success: true });
    });
  }
);

module.exports = router;
