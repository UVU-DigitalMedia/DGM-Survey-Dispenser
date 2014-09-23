/* global angular, FastClick */
angular.module('fastclick', [])
.config(function () {
  if (!window.FastClick) { return; }
  FastClick.attach(document.body);
});
