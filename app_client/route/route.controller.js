
angular
	.module('bitacora')
	.controller('routeCtrl', routeCtrl);

function routeCtrl($routeParams, bitacoraData, $scope){

	//var vm = this;


	$scope.routeid = $routeParams.routeid;
	
	bitacoraData.routeById($scope.routeid)
		.success(function(data){

			$scope.route = data;	
			
			

		})
		.error(function(e){
			console.log(e);
		});


	

}