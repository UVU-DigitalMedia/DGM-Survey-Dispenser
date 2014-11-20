angular.module('dgmSurvey.controllers')
.controller('TestCtrl', function ($scope) {
  $scope.title = 'Dynamic Title!';
  $scope.time = 0;
  setInterval(function () {
    $scope.time++;
    $scope.$apply();
  }, 1000);
});
