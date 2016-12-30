

angular.module('bitacora', ['ngRoute']);

function config($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			templateUrl : '/home/home.view.html',
			controller : 'homeCtrl'
		})
		.when('/login',{
			templateUrl: '/login/login.view.html' 
		})
		.when('/search/:lng/:lat',{
			templateUrl: '/search/search.view.html',
			controller: 'searchCtrl'
			//controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
}

angular
	.module('bitacora')
	.config(['$routeProvider', '$locationProvider', config]);

$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHOdauoh_16stWPxM67AJZpWjp3UWA2rI&libraries=places&callback=initialize", function( data, textStatus, jqxhr ) {
  //console.log( data ); // Data returned
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Google Maps - Load was performed." );
});