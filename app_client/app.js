

angular.module('bitacora', ['ngRoute']);

function config($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			templateUrl : '/home/home.view.html',
			controller : 'homeCtrl'
		})
		
		.when('/search/:routeid',{
			templateUrl: '/search/search.view.html',
			controller: 'searchCtrl',
			controllerAs: 'vm'
		})
		 .when('/register', {
        	templateUrl: '/auth/register/register.view.html',
        	controller: 'registerCtrl',
        	controllerAs: 'vm'
      	})
      	.when('/login', {
	        templateUrl: '/auth/login/login.view.html',
        	controller: 'loginCtrl',
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