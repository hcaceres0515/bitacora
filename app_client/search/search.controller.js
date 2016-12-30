
angular
	.module('bitacora')
	.controller('searchCtrl', searchCtrl);

function searchCtrl($routeParams, bitacoraData, $scope, $location){

	//var vm = this;


	$scope.lng = $routeParams.lng;
	$scope.lat = $routeParams.lat;
	/*
	bitacoraData.routeById(vm.routeid)
		.success(function(data){
			console.log(data);
		})
		.error(function(e){
			console.log(e);
		});
		
	console.log(vm.routeid);
*/
	bitacoraData.searchRoutesByDistance($scope.lng, $scope.lat)
		.success(function(data){

			$scope.routes = data;	
			// Get info user
			var i = 0;
			angular.forEach($scope.routes, function(value, key) {
		  		
		  		bitacoraData.getUserById(value.user)
					.success(function(data){
						$scope.routes[i++].user_info = data;
					})
					.error(function(e){
						console.log(e);
					});
			});

			//console.log($scope.routes);

		})
		.error(function(e){
			console.log(e);
		});

		$scope.reload = function(routeid){
			
		$window.location.url("/#/route/"+routeid);
	}
	

}