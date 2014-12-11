angular.module('dgmSurvey.services')
    .factory('questionService', function ($http) {
        return {
            getAllQuestions: function () {
                return $http.get('/v1/question');
            },
            postQuestion: function (question) {
                return $http.post('/v1/question', question);
            },
            //            getQuestionTypes: function () {
            //                return $http.get('/v1/question/types')
            //                    .success(function (data, headers) {
            //                        console.log(data);
            //                        console.log(headers);
            //                        return data;
            //                    })
            //                    .error(function (data, headers) {
            //                        console.log(data.error);
            //                    });
            //            }
            getQuestionTypes: function () {
                return $http.get('/v1/question/types');
            }
        };
    });
