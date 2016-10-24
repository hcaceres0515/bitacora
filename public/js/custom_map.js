
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var BASE_URL = "http://localhost:3000/";

var map;


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 10
	});
	var infoWindow = new google.maps.InfoWindow({map: map});
	
  	// Try HTML5 geolocation.

  	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
  			var pos = {
  				lat: position.coords.latitude,
  				lng: position.coords.longitude
  			};

  		infoWindow.setPosition(pos);
  		infoWindow.setContent('You are here');
  		map.setCenter(pos);
  		
  		getUsers();

  	}, function() {
  		handleLocationError(true, infoWindow, map.getCenter());
  	});
  	} else {
    	// Browser doesn't support Geolocation
    	handleLocationError(false, infoWindow, map.getCenter());
	}

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}

var beaches = [];

function getUsers(){

	$.get(BASE_URL+'api/getUsers',{

	},function(data){	
		
		var users = data;
		var routes = [];
		var j = 1;
		for( var i = 0; i < users.length ; i++ ){
			if( users[i].routes.length > 0){				
				var location = [users[i].routes[0].locations[0].description, users[i].routes[0].locations[0].lat, users[i].routes[0].locations[0].lon, j];
				j = j + 1;
				routes.push(location);

			}
		}
		
		beaches = routes;
		console.log(beaches);
		setMarkers(map); 
	});
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
/*var beaches = [
['Bondi Beach', -33.890542, 151.274856, 4],
['Coogee Beach', -33.923036, 151.259052, 5],
['Cronulla Beach', -34.028249, 151.157507, 3],
['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
['Maroubra Beach', -33.950198, 151.259302, 1]
];
*/
function setMarkers(map) {
  
 	var image = {
  		url: 'https://cdn2.iconfinder.com/data/icons/smiled-map-markers/512/smile_marker_pointer_position_emotion_emoticon_smile-64.png',
    	size: new google.maps.Size(64, 64),
    	origin: new google.maps.Point(0, 0),
    	anchor: new google.maps.Point(0, 64)
	};
  
 	var shape = {
  		coords: [1, 1, 1, 20, 18, 20, 18, 1],
  		type: 'poly'
  	};
 	for (var i = 0; i < beaches.length; i++) {
  		var beach = beaches[i];
  		var marker = new google.maps.Marker({
  			position: {lat: beach[1], lng: beach[2]},
  			map: map,
  			icon: image,
  			shape: shape,
  			title: beach[0],
  			zIndex: beach[3]
  		});
  	}
}

