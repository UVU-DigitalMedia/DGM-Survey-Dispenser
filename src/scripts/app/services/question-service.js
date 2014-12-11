angular.module('dgmSurvey.services')
.factory('questionService', function ($http) {
  return {
    getAllQuestions: function () {
      return $http.get('/v1/question');
    },
    postQuestion: function (question) {
     return $http.post('/v1/question', question);
  }
  };
});
