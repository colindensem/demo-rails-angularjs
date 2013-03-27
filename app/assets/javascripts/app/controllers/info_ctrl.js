window.InfoCtrl = ['$scope','Info', function($scope, Info) {
    console.log("In InfoCtrl");
    $scope.message = "hello from me, I'm the angularController InfoCtrl";

    $scope.info = Info.get();

}];