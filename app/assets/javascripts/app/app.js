var app;
app = angular.module('app', ['ui.bootstrap','app.services','app.controllers','app.filters','app.directives']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.

        when('/info', {
            controller: 'InfoCtrl',
            templateUrl: ASSETS['info']
        }).
        when('/info2', {
            controller: 'InfoCtrl',
            templateUrl: ASSETS['info']
        }).

        otherwise({
            redirectTo:'/info'
        });
    }]);
