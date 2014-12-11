angular.module('dgmSurvey.services')
    .factory('loginService', function ($http, $state) {
        return {
            loginAdmin: function (data) {
                return $http.post('/v1/auth/login', data)
                    .success(function (data) {
                        $state.go('tab.question');
                    })
                    .error(function () {
                        console.log(loginAdmin);
                    });
            }
        };
    });
