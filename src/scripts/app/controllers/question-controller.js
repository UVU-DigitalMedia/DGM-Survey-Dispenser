angular.module('dgmSurvey.controllers')
    .controller('QuestionCtrl', function ($scope, questionService) {
        $scope.question = {
            choices: []
        };

        var promise =
            questionService.getQuestionTypes();
        promise.then(
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
        }
        $scope.addAnswer = function () {
            $scope.question.choices.push({});
        }
    });
