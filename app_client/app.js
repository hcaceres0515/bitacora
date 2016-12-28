

angular.module('bitacora', ['ngRoute']);

function config($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			templateUrl : '/home/home.view.html',
			controller : 'homeCtrl'
		})
		.when('/login',{
			templateUrl: 'login/login.view.html' 
		})
		.when('/search/:routeid',{
			templateUrl: '/search/search.view.html',
			controller: 'searchCtrl',
			controllerAs: 'vm'
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