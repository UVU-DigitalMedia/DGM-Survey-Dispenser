angular.module('dgmSurvey', [
  'ionic',
  'd3',
  'dgmSurvey.controllers',
  'dgmSurvey.services'
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar
            // above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
            .state('tab.adminLogin', {
                url: '/adminLogin',
                views: {
                    'tab-admin': {
                        templateUrl: 'templates/tab-admin-login.html',
                        controller: 'loginCtrl'
                    }
                }
            })
            .state('tab.adminDashboard', {
                url: '/adminDash',
                views: {
                    'tab-admin': {
                        templateUrl: 'templates/admin-dashboard.html',
                        controller: 'adminDashCtrl'
                    }
                }
            })
            .state('tab.adminReports', {
                url: '/adminReports',
                views: {
                    'tab-admin': {
                       templateUrl: 'templates/admin-reports.html',
                       controller: 'adminReportsCtrl'
                    }
                }
            })
            .state('tab.adminViewQuestion', {
                url: '/adminViewQuestion',
                views: {
                    'tab-admin': {
                        templateUrl: 'templates/admin-view-question.html',
                        controller: 'QuestionCtrl'
                    }
                }
            })
            .state('tab.question', {
                url: '/question',
                views: {
                    'tab-admin': {
                        templateUrl: 'templates/question.html',
                        controller: 'QuestionCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/adminLogin');

    });

angular.module('dgmSurvey.controllers', []);
angular.module('dgmSurvey.services', []);
