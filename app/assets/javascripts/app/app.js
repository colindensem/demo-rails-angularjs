angular.module('app', [
'info']);

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo:'/info'});
}]);

angular.module('app').controller("AppCtrl", ['$scope', function($scope) {
    console.log('In AppCtrl');


}] );