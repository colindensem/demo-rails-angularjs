var app;
app = angular.module('app', ['ui.bootstrap','security','app.services','app.controllers','app.filters','app.directives']);
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
        when('/sites', {
            controller: 'SiteCtrl',
            templateUrl: ASSETS['site']
        }).

        otherwise({
            redirectTo:'/info'
        });
    }]);

angular.module('app').run(['security', function(security) {
    // Get the current user when the application starts
    // (in case they are still logged in from a previous session)
    security.requestCurrentUser();
}]);


app.config(function($httpProvider) {

    var interceptor = ['$rootScope', '$q', function(scope, $q) {

        function success( response ) {
            return response
        };

        function error( response ) {
            if ( response.status == 401) {
                var deferred = $q.defer();
                scope.$broadcast('event:unauthorized');
                return deferred.promise;
            };
            return $q.reject( response );
        };

        return function( promise ) {
            return promise.then( success, error );
        };

    }];
    $httpProvider.responseInterceptors.push( interceptor );
});

