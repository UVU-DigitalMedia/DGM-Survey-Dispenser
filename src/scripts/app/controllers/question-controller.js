angular.module('dgmSurvey.controllers')
    .controller('QuestionCtrl', function ($scope, questionService) {

        //        $scope.questionTypes = function () {
        //            return questionService.getQuestionTypes.types;
        //        }
        //        console.log(questionService.getQuestionTypes().then(response) {});
        //        console.log($scope.questionTypes);
        var promise =
            questionService.getQuestionTypes();
        promise.then(
            function (payload) {
                $scope.questionTypes = payload.data.types;
            },
            function (errorPayload) {
                $log.error('failed to load question types', errorPayload);
            });
        $scope.addQuestion = function (question, type, choices) {
            console.log($scope.questionTypes);
            var questionData = {
                "label": "New Label",
                "question": question,
                "type": type,
                "choices": [{
                    "label": choices,
                    "key": "answerKey"
                }]
            }
            console.log(questionData);
        }
        $scope.typeChange = function (type) {
            console.log("Type:", type.value);
        }
    });
