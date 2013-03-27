(function(){
    var app;
    app = angular.module('app.filters',['app.services']);

    app.filter('capitalize', function(){
        return function(input){
            return input.substring(0,1).toUpperCase() + input.substring(1)
        }
    });
})();