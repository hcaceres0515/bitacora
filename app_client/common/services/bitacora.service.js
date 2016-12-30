

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
    	return $http.get('/api/search_routes/'+lng+"/"+lat);
    }
	return {
		getUsers : getUsers,
		routeById : routeById.
		searchRoutesByDistance : searchRoutesByDistance
	};
}