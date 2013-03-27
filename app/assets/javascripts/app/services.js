(function(){
    var app;
    app = angular.module('app.services',['ngResource']);

    app.factory('Info', ['$resource',function($resource){
        return $resource('/api/v1/info');
    }])


    app.factory('Site', ['$resource',function($resource){
        return $resource('/api/v1/sites/:site_id');
    }]);

})();
