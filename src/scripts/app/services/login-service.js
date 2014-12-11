angular.module('dgmSurvey.services')
    .factory('loginService', function ($http, $state) {
        return {
            loginAdmin: function (data) {
                return $http.post('/v1/auth/login', data)
                    .success(function (data, headers) {
                        if (data.success === true) {
                            $state.go('tab.question');
                            console.log(data);
                            console.log(headers);
                        } else {
                            console.log(data.error);
                        }
                    })
                    .error(function (data, headers) {
                        if (data.success === false) {
                            console.log(data.error);
                        }
                    });
            }
        };
    });
