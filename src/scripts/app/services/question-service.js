angular.module('dgmSurvey.services')
    .factory('questionService', function ($http, $state) {
        return {
            getAllQuestions: function () {
                return $http.get('/v1/question');
            },
            postQuestion: function (question) {
                return $http.post('/v1/question', question)
                    .success(function (data, headers) {
                        if (data.success === true) {
                            $state.go('tab.adminDashboard');
                            console.log(data);
                            console.log(headers);
                        }
                    })
                    .error(function (data, headers) {
                        if (data.success === false) {
                            console.log(data.error);
                        }
                    });
            },
            getQuestionTypes: function () {
                return $http.get('/v1/question/types');
            },
            deleteAQuestionMethod: function (id) {
                return $http.delete('/v1/question/' + id)
                    .success(function (data, headers) {
                        if (data.success === true) {
                            $state.go($state.current, {}, {
                                reload: true
                            });
                        }
                    })
                    .error(function (data, headers) {
                        if (data.success === false) {
                            console.log(data.error);
                        }
                    });

            },
            getQuestionAnswers: function (id) {
                return $http.get('/v1/question/' + id + '/answers');
            }
        };
    });
