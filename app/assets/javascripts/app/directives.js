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
})();