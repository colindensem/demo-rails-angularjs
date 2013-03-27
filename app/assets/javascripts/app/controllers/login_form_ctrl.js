window.LoginFormCtrl = ['$scope','security', function($scope, security) {
    console.log("In LoginFormCtrl");

    // The model for this form
    $scope.user = {};

    $scope.login = function() {
        //Clear any errors
        $scope.authError = null;

        //Attempt Login
        security.login($scope.user.email, $scope.user.password).then(function(loggedIn) {
            if ( !loggedIn) {
                $scope.authError = 'Credentials are not valid';
            }
        }, function(x) {
            // problem with request to server
            $scope.authError = 'Login Server offline, please try later';
        });
    };

    $scope.clearForm = function() {
        $scope.user = {};
    };

    $scope.cancelLogin = function() {
        security.cancelLogin();
    };

}];