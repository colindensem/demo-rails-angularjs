(function(){
    var app;
    app = angular.module('app.services',['ngResource']);

    app.factory('Info', ['$resource', 'TokenHandler',
        function($resource, tokenHandler){
            var resource = $resource('/api/v1/info');

            resource = tokenHandler.wrapActions( resource, ['get'] );

            return resource;

    }]);

    app.factory('Session', ['$resource', function($resource){
        return $resource('/api/v1/sessions',
            {},
            {
                'login': {method: 'POST', isArray: true}
            }
        )
    }]);

    app.factory('Site', ['$resource', 'TokenHandler',function($resource, tokenHandler){
        var resource = $resource('/api/v1/sites/:id',
            {id: '@id'},
            {
                query: { method: 'GET', isArray:true},
                update: {method: 'PUT'},
                delete: { method: 'DELETE'}
            }
        );
        resource = tokenHandler.wrapActions( resource, ['query',
            'update','delete', 'create','get']);
        return resource;
    }]);

    /*
     * Token handling from:
     * http://nils-blum-oeste.net/angularjs-send-auth-token-with-every--request/#.UVMy6Vvt9nF
     * https://gist.github.com/nblumoe/3052052
     */
    app.factory('TokenHandler', function() {
        var tokenHandler = {};
        var token = "none";

        tokenHandler.set = function( newToken ) {
            token = newToken;
        };

        tokenHandler.get = function() {
            return token;
        };

        // wrap given actions of a resource to send auth token with every
        // request
        tokenHandler.wrapActions = function( resource, actions ) {
            // copy original resource
            var wrappedResource = resource;
            for (var i=0; i < actions.length; i++) {
                tokenWrapper( wrappedResource, actions[i] );
            };
            // return modified copy of resource
            return wrappedResource;
        };

        // wraps resource action to send request with auth token
        var tokenWrapper = function( resource, action ) {
            // copy original action
            resource['_' + action]  = resource[action];
            // create new action wrapping the original and sending token
            resource[action] = function( data, success, error){
                return resource['_' + action](
                    angular.extend({}, data || {}, {auth_token: tokenHandler.get()}),
                    success,
                    error
                );
            };
        };

        return tokenHandler;
    });



})();
