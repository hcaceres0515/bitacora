

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
    
    var searchRoutesByDistance = function(lng, lat){
    	return $http.get('/api/search_routes/'+lng+'/'+lat);
    }

    var getUserById = function(userId){
    	return $http.get('/api/users/'+userId);
    }

	return {
		getUsers : getUsers,
		getUserById : getUserById,
		routeById : routeById,
		searchRoutesByDistance : searchRoutesByDistance
	};
}