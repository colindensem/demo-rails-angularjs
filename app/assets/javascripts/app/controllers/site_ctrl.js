window.SiteCtrl = ['$scope','Site', function($scope, Site) {
    console.log("In SiteCtrl");
    $scope.message = "hello from me, I'm the angularController SiteCtrl";

    $scope.sites = Site.query();

}];