(function(){
    var app;
    app = angular.module('app.directives',[]);

    app.directive('example', function(){
        return function(scope,elm,attrs,ctrl){
            elm.bind('click', function(e){
                scope.$apply(function(){
                    scope.message = "hello world"
                    elm.text("You clicked me");
                });
            });
        };
    });

    app.directive('loginToolbar', ['security', function(security) {
        var directive = {
            templateUrl: ASSETS['toolbar'],
            restrict: 'E',
            replace: true,
            scope: true,
            link: function($scope, $element, $attrs, $controller) {
                $scope.isAuthenticated = security.isAuthenticated;
                $scope.login = security.showLogin;
                $scope.logout = security.logout;
                $scope.$watch(function() {
                    return security.currentUser;
                }, function(currentUser) {
                    $scope.currentUser = currentUser;
                });

                $scope.$on('event:unauthorized', function( event ) {
                    security.showLogin();
                });
                $scope.$on('event:authenticated', function( event ) {
                    security.hideLogin();
                });

            }
        };
        return directive;
    }]);
})();