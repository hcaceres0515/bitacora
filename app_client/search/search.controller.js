
angular
	.module('bitacora')
	.controller('searchCtrl', searchCtrl);

function searchCtrl($routeParams, bitacoraData, $scope){

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
			console.log(data);
		})
		.error(function(e){
			console.log(e);
		});
}