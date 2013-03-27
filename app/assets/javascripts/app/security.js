angular.module('security', [
    'security.service'
]);

angular.module('security.service', ['ui.bootstrap.dialog'])

    .factory('security', ['$dialog','$location','Session', '$http','TokenHandler', function ($dialog, $location,Session, $http, tokenHandler) {

        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        // Login form dialog stuff
        var loginDialog = null;
        function openLoginDialog() {
            if ( !loginDialog ) {
                loginDialog = $dialog.dialog();
                loginDialog.open(ASSETS['login_form'], 'LoginFormCtrl').then(onLoginDialogClose);
            }
        }
        function closeLoginDialog(success) {
            if (loginDialog) {
                loginDialog.close(success);
                loginDialog = null;
            }
        }
        function onLoginDialogClose(success) {
            if ( success ) {
//                queue.retryAll();
            } else {
//                queue.cancelAll();
//                redirect();
            }
        }

        //Main service calls
        var service = {

            showLogin: function() {
               openLoginDialog();
            },

            closeLogin: function() {
              closeLoginDialog(false);
            },
            cancelLogin: function() {
                closeLoginDialog(false);
                redirect();
            },

            login: function(email, password) {
                var request = $http.post('/api/v1/login',
                        {user: {email: email, password: password} });
                    return request.then(function(response) {
                    tokenHandler.set( response.data.auth_token );
                    service.currentUser = response.data.user;
                    if ( service.isAuthenticated() ) {
                        closeLoginDialog(true);
                    }
                });
            },

            logout: function(redirectTo) {
                $http.post('/api/v1/logout').then(function() {
                    service.currentUser = null;
                    tokenHandler.set ( 'none' );
                    redirect(redirectTo);
                });
            },

            // Ask the backend to see if a user is already authenticated - this may be from a previous session.
            requestCurrentUser: function() {
                if ( service.isAuthenticated() ) {
                    return $q.when(service.currentUser);
                } else {
                    return $http.get('/api/v1/current_user').then(function(response) {
                        service.currentUser = response.data.user;
                        tokenHandler.set( response.data.auth_token );
                        return service.currentUser;
                    });
                }
            },

            //CurrentUser information
            currentUser: null,

            isAuthenticated: function(){
                return !!service.currentUser;
            }
        } ;


        return service;

    }]);




