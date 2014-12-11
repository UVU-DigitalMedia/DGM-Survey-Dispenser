angular.module('dgmSurvey.controllers')
    .controller('loginCtrl', function ($scope, loginService) {

        $scope.signIn = function (id, pass) {
            var data = {
                "email": id,
                "password": pass
            };

            loginService.loginAdmin(data);

        }
    });
