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
        $scope.master= {};

        $scope.isUnchanged = function(thing) {
            return angular.equals(thing, $scope.master);
        };

        $scope.save = function() {
            $scope.errors = [];
            //Copy form, if invalid, submit is disabled till a change occurs.
            $scope.master= angular.copy($scope.site);
            Site.save({site: $scope.site}, function(){
                $location.path('/sites');
            },
            function(response) {
                if(response.status === 400) {
                    angular.forEach(response.data, function(value, key) {
                        for(var i =0; i < value.length; i++) {
                            $scope.errors.push('Error on ' +key+ ', ' +value[i]);
                        }
                    });
                }

            });
    };



}];

window.SiteEditCtrl = ['$scope','$location', '$routeParams','Site',
    function($scope, $location, $routeParams,  Site) {
        $scope.site = Site.get({id: $routeParams.editId});

        $scope.master= {};

        $scope.isUnchanged = function(thing) {
            return angular.equals(thing, $scope.master);
        };

        $scope.save = function() {
            //Copy form, if invalid, submit is disabled till a change occurs.
            $scope.master= angular.copy($scope.site);
            $scope.errors = [];
            Site.update({id:$routeParams.editId, site: $scope.site},
                function(){
                    $location.path('/sites');
                },
                function(response) {
                    if(response.status === 400) {
                        angular.forEach(response.data, function(value, key) {
                            for(var i =0; i < value.length; i++) {
                                $scope.errors.push('Error on ' +key+ ', ' +value[i]);
                            }
                        });
                    }

                });







        }

    }];