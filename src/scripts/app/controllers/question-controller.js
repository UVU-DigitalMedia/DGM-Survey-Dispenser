angular.module('dgmSurvey.controllers')
    .controller('QuestionCtrl', function ($scope, questionService, $log) {
        $scope.question = {
            choices: []
        };

        var questionTypePromise = questionService.getQuestionTypes();
        questionTypePromise.then(
            function (payload) {
                $scope.questionTypes = payload.data.types;
            },
            function (errorPayload) {
                $log.error('failed to load question types', errorPayload);
            });
        $scope.addQuestion = function (question) {
            //            console.log(arguments);
            //            var questionData = {
            //                "label": "New Label",
            //                "question": question,
            //                "type": type,
            //                "choices": [{
            //                    "label": choices,
            //                    "key": "answerKey"
            //                }]
            //            }
            //            console.log(questionData);
            console.log(question);
            questionService.postQuestion(question);
        };
        $scope.addAnswer = function () {
            $scope.question.choices.push('');
        };
        var questionPromise = questionService.getAllQuestions();
        questionPromise.then(
            function (payload) {
                $scope.questionViews = payload.data.questions;
                console.log($scope.questionViews);
            },
            function (errorPayload) {
                $log.error('failed to load questions', errorPayload);
            });

        $scope.deleteQuestion = function (id) {
            questionService.deleteAQuestionMethod(id);
        };

    });
