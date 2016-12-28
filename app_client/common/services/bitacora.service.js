

angular
	.module('bitacora')
	.service('bitacoraData', bitacoraData);

function bitacoraData($http){

	var getUsers = function (){
		return $http.get('/api/users');
	}

	var routeById = function (routeId){
		return $http.get('/api/user/route/'+routeId);
	}

	return {
		getUsers : getUsers,
		routeById : routeById
	};
}