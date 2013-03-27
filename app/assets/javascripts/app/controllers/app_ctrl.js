window.AppCtrl = ['$scope','security', function($scope, security) {
    console.log('In AppCtrl');
    $scope.debug = false;
    $scope.isAuthenticated = security.isAuthenticated;
}];

