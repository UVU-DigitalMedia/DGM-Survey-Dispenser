angular.module('dgmSurvey.controllers')
    .controller('QuestionCtrl', function ($scope, questionService) {

        $scope.questionTypes = function () {
            return questionService.getQuestionTypes.types;
        }
        console.log(questionService.getQuestionTypes().then(response) {});
        console.log($scope.questionTypes);
    });
