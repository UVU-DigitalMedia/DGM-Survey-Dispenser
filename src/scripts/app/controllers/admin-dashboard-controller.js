angular.module('dgmSurvey.controllers')
    .controller('adminDashCtrl', function ($scope, $state) {

        $scope.goCreate = function () {
            $state.go('tab.question');
        }
        $scope.goView = function () {
            $state.go('tab.adminViewQuestion');
        }
    });
