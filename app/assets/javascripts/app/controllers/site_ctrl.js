window.SiteIndexCtrl = ['$scope','Site', function($scope, Site) {
    console.log("In SiteCtrl");
    $scope.message = "hello from me, I'm the angularController SiteCtrl";

    $scope.sort_order = 'Name';
    $scope.is_desc = false;

    $scope.sites = Site.query({sort: $scope.sort_order, desc: $scope.is_desc});



    $scope.delete = function() {
        var id = this.site.id;
        Site.delete({id: id}, function() {
            $('#site_' + id).fadeOut();
        });



    }
}];

window.SiteCreateCtrl = ['$scope','$location','Site',
    function($scope, $location,  Site) {

    $scope.save = function() {
        Site.save({site: $scope.site}, function(){
            $location.path('/sites');
        });
    }

}];

window.SiteEditCtrl = ['$scope','$location', '$routeParams','Site',
    function($scope, $location, $routeParams,  Site) {
        $scope.site = Site.get({id: $routeParams.editId});
        $scope.save = function() {
            Site.update({id:$routeParams.editId, site: $scope.site}, function(){
                $location.path('/sites');
            });
        }

    }];