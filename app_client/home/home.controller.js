

angular
	.module('bitacora')
	.controller('homeCtrl', homeCtrl);

function homeCtrl($scope, bitacoraData){
	
	$scope.pageHeader = {
		title : 'Bitacora',
		strapline: 'Find places to work with wifi near you!'
	};

	$scope.sidebar = {
		content : 'Locking for wifi and a seat etc etc'
	};

	$scope.users = [];

	bitacoraData.getUsers()
		.success(function(response){
			$scope.users = response;
		})
		.error(function(e){
			console.log("Error API");
		});
}