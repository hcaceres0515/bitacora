
angular
	.module('bitacora')
	.controller('searchCtrl', searchCtrl);

function searchCtrl($routeParams, bitacoraData){

	var vm = this;

	vm.routeid = $routeParams.routeid;
	
	bitacoraData.routeById(vm.routeid)
		.success(function(data){
			console.log(data);
		})
		.error(function(e){
			console.log(e);
		});
		
	console.log(vm.routeid);

}