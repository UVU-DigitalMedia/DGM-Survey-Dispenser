angular.module('dgmSurvey.controllers')
.controller('adminReportsCtrl', function ($scope, questionService, loading) {

  // Get all the questions
  loading.load();
  questionService.getAllQuestions().then(function (res) {
    $scope.questions = res.data.questions;
  }).finally(loading.unload);


  $scope.getAnswerData = function (index) {
    var qid = $scope.questions[index]._id;
    questionService.getQuestionAnswers(qid).then(function (res) {
      $scope.questions[index].answerData = transformAnswers(res.data.answers);
      $scope.questions[index].answers = res.data.answers;
      $scope.questions[index].gotData = true;
    });
  };


  function transformAnswers(answers) {
    var finalAnswers = {};

    var incrementValue = function (value) {
      finalAnswers[value] = (finalAnswers[value] || 0) + 1;
    };

    angular.forEach(answers, function (answer) {
      var value = answer.value;
      if (isArray(value)) {
        angular.forEach(value, incrementValue);
      } else {
        incrementValue(value);
      }
    });

    var returnValues = [];

    angular.forEach(finalAnswers, function (value, label) {
      returnValues.push({label: label, value: value});
    });

    return returnValues;
  }

  function isArray(obj) {
    return typeof obj === 'object' && obj.length != null;
  }

});
