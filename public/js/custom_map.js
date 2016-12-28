
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//var BASE_URL = "http://localhost:3000/";

var map;


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 12
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

	var locations = [
		{
			_id : "12323",
			user: "123213",
			name: "harold ernesto",
			avatar: "https://cdn2.iconfinder.com/data/icons/smiled-map-markers/512/smile_marker_pointer_position_emotion_emoticon_smile-64.png",
			lng: -71.5408935,
			lat: -16.4065013,
			description: "Viaje a moquegua con la familia 1"
		},

		{
			_id : "121231",
			user: "asdsad",
			name: "harold claudio",
			avatar: "https://cdn2.iconfinder.com/data/icons/smiled-map-markers/512/smile_marker_pointer_position_emotion_emoticon_smile-64.png",
			lng: -71.5508935,
			lat: -16.4165013,
			description: "Viaje a moquegua con la familia 2"
		},

		{
			_id : "121231",
			user: "1232324",
			name: "harold alexis",
			avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEX///+dt2uhunP6+/np7uD09vCju3W8zJyovn7N2bfm7NyfuG60x5Dg59Lh59T8/Pv29/LB0KTT3b/u8ujF06qrwIKxxIzZ4sjJ1rHT3r6qv3+ku3i4yZfD0qjX4Ma6zJo6TZJWAAACw0lEQVRIiY1XWaKDIAxUgargLi4tffb+t3y4YcCgzp+GMSG7QYCB5bJXIhSvpK+HtkTP4CBcdlFoID51QR5SSx4D5oroWzzSXo0vlzrjJdk9l2YYdUZP77i883HDMMlvuB8/NwzVJZte6F10cz+38t7X3NvvtdE5GinlBk36IsaVxcwa3ra8yYT1tsC5ZQxPdcOWVGSwHPHFc41DE2FQaX+vWoIjynIrTYCoxm7NoHWpLUuBKGkRci78BxjIHYFlCrT655pWw2ghZJggoytsoL+RS8MgN65wAsKuOpNhoFJXCDUnSIoCcVi7Qpi4CnE3JPeOZSS7IUOz3XAUUIiZDbMozCzV5Htl1gzrQChB/pejVVgxEqq3RRZHs6xs7jmOGtTpuH3DtIqSDb39/oU1Uftis/LkJ2XcCed1hhZ0Ez7CKYEWtMk9E4/yjL8nZMzXMzg6pGyg1Tyj/F2xum8tx78RyZAV+Wm0mpvWObuZsado7VpjqpmEtay6+AKuOkpJUNIx+6ik+zUeb+uPY7eOmjJo/4wzk9R37eKsWrzLoLCGRuZRXtYnck2CwkmfzsOmyuHqFt6epnbmsTx1zkkwAJW5OJ7gAbMrUBfg4YfJ9EF05mgMVg3qAjRuSNgxSD2qiTWmx30Aiij601kkovXbPU62fdYE7XLRbuBUNybG+bQ8Kw/Z8tmwzXwxbg2ErYYJHxksRUKTNx/ES0c0W4KPHBRHYU8B3Zy0VvJuVeQlg9GUBq0y0WFVUGx2dH7yEezY1GlG8j7j+45wGoUA+W74h+1dNau1/UqugfOtYwtKs2RM9qaz4Xe5+RvD9VibTnWqblbvPaNFA8zYXT1dcw+Pay9X0t4/m9v/jT1V5i2ZNKAd9DcL/4J1CX6tfm3H9Wcp0sPzAVdPPm2sMLVX8eH9Hqi36TsgupLjp39jJ7R97+3SK/4Bzk4ghGetujMAAAAASUVORK5CYII=",
			lng: -71.5608935,
			lat: -16.4265013,
			description: "Viaje a moquegua con la familia 3"
		}
	];

	var routes = [];
	var j = 1;
	
	/*for( var i = 0; i < locations.length ; i++ ){
		var location = [locations[i].description, locations[i].lat, locations[i].lon, j];
		j = j + 1;
		routes.push(location);		
	}*/
	
	beaches = locations;
	console.log(locations);
	setMarkers(map); 

	/*
	$.get('/api/users',{

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
	});*/
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

	for (var i = 0; i < beaches.length; i++) {

		var beach = beaches[i];

		var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1 id="firstHeading" class="firstHeading">'+beach.name+'</h1>'+
		'<div id="bodyContent">'+
		'<p>'+beach.description+'</p>'+		
		'</div>'+
		'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var image = {
			url: beach.avatar,
			size: new google.maps.Size(64, 64),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 64)
		};


		var marker = new google.maps.Marker({
			position: {lat: beach.lat, lng: beach.lng},
			map: map,
			icon: image,
			title: beach.name,
			zIndex: i +1,
			infowindow: infowindow 
		});

		marker.addListener('click', function() {
			this.infowindow.open(map, this);
		});	
	}
}

