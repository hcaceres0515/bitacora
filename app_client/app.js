

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
		.when('/route/:routeid',{
			templateUrl : '/route/route.view.html',
			controller : 'routeCtrl'
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
/*
$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHOdauoh_16stWPxM67AJZpWjp3UWA2rI&libraries=places&callback=initialize", function( data, textStatus, jqxhr ) {
  //console.log( data ); // Data returned
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Google Maps - Load was performed." );
});*/

    function loadScript(src,callback){
  
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(callback)script.onload=callback;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = src;
  }
  
  
  loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCHOdauoh_16stWPxM67AJZpWjp3UWA2rI&libraries=places&callback=initialize',
              function(){log('google-loader has been loaded, but not the maps-API ');});


              function log(str){
  document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
}
