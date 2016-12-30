
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//var BASE_URL = "http://localhost:3000/";

var map;


function initMap() {

      initializeSearch();

      map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -16.4165013, lng: -71.5408935},
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.TERRAIN
      });
      //var infoWindow = new google.maps.InfoWindow({map: map});
      

      // Try HTML5 geolocation.

      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                  var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                  };

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('<h6 style="color:black;">You are here</h6>');
            //map.setCenter(pos);
            
            getUsers();

      }, function() {
            //handleLocationError(true, infoWindow, map.getCenter());
      });
      } else {
      // Browser doesn't support Geolocation
      //handleLocationError(false, infoWindow, map.getCenter());
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
                  name: "Joselin Sardon",
                  avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/14925568_1187757201271275_6236765995708890451_n.jpg?oh=479c2351dc5fa4ad15641367a4063dcf&oe=58D056EF",
                  lng: -71.5408935,
                  lat: -16.4065013,
                  description: "Viaje a moquegua con la familia 1"
            },{
                  _id : "1232asd3",
                  user: "12321sad3",
                  name: "Harold Caceres",
                  avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/13177730_1178945592124336_1246955548052490589_n.jpg?oh=1bb88385ac37502706735b25c78af998&oe=58BEBFFB",
                  lng: -71.5558935,
                  lat: -16.4185013,
                  description: "Viaje a moquegua con la familia 1"
            },
            {
                  _id : "121231",
                  user: "asdsad",
                  name: "Angel luna",
                  avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/14364647_1212464612139666_8170778031067824203_n.jpg?oh=dc4ab512c6160457826b2fae1aaa7cfb&oe=58CF044B",
                  lng: -71.5508935,
                  lat: -16.4165013,
                  description: "Viaje a moquegua con la familia 2"
            },

            {
                  _id : "121231",
                  user: "1232324",
                  name: "Mauricio Maldonado",
                  avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/12744153_960434714030802_8163824430887150015_n.jpg?oh=8e0177c4d190965347cdc3455a08126f&oe=58BFABBB",
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

      //create empty LatLngBounds object
      var bounds = new google.maps.LatLngBounds();

      var flightPlanCoordinates = [];
      for (var i = 0; i < beaches.length; i++) {

            var beach = beaches[i];

            var contentString = '<div >'+
            '<div >'+
            '</div>'+
            '<h3 style="color:black;">'+beach.name+'</h3>'+
            '<div >'+
            '<p style="color:black;">'+beach.description+'</p>'+           
            '</div>'+
            '</div>';

            var infowindow = new google.maps.InfoWindow({
                  content: contentString
            });

            var image = {
                  url: beach.avatar,
                  size: new google.maps.Size(64, 64),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(0, 0)
            };

            flightPlanCoordinates[i] = {lat: beach.lat, lng: beach.lng};

            var marker = new google.maps.Marker({
                  position: {lat: beach.lat, lng: beach.lng},
                  map: map,
                  icon: image,
                  title: beach.name,
                  routeId: beach._id,
                  zIndex: i +1,
                  infowindow: infowindow 
            });

            bounds.extend(marker.position);

            marker.addListener('click', function() {
                  //window.location.href = "/routes/"+lat;
                  alert("/route/"+marker.routeId);
            });   

              google.maps.event.addListener(marker, 'mouseover', function() {
                  this.infowindow.open(map, this);
            });   

             google.maps.event.addListener(marker, 'mouseout', function() {
                  this.infowindow.close();
            });
      }

      //now fit the map to the newly inclusive bounds
            map.fitBounds(bounds);

            var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          //strokeColor: '#fed136',
          strokeColor: '#333',
          strokeOpacity: 1.0,
          strokeWeight: 4
        });

        flightPath.setMap(map);
}


function initializeSearch() {
      var input = document.getElementById('pac-input');
      var autocomplete = new google.maps.places.Autocomplete(input);      
      autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            console.log(place);
            var lat = place.geometry.location.lat();
            var lng = place.geometry.location.lng();
            var formatted_address = place.formatted_address;
      window.location.href = "/mapSearch/"+lat+"/"+lng+"/"+formatted_address;
      });        
}


 // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.
      function initAutocomplete() {
      var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);     
      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
      });
      var markers = [];
      // [START region_getplaces]
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      console.log(places);
      if (places.length == 0) {
      return;
      }
      // Clear out the old markers.
      markers.forEach(function(marker) {
      marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
      var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
      }));
      if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
      } else {
      bounds.extend(place.geometry.location);
      }
      });
      map.fitBounds(bounds);
      });
      // [END region_getplaces]
      }


//https://maps.googleapis.com/maps/api/streetview?size=600x300&location=41.403609,2.174448&heading=100&pitch=28&scale=2&key=AIzaSyB8Sy_Czas5ilPczOe4q7uhJDmS66VT064



var app = angular.module("routerInfoApp", []); 

app.controller('controlRouterInfo', function($scope) {
    
    var locations = [            
            {
                  _id : "12323",
                  user: "123213",
                  name: "Joselin Sardon",
                  avatar: "https://maps.googleapis.com/maps/api/streetview?size=300x300&location=41.403609,2.174448&heading=151.78&pitch=-0.76&key=AIzaSyB8Sy_Czas5ilPczOe4q7uhJDmS66VT064",
                  //avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/14925568_1187757201271275_6236765995708890451_n.jpg?oh=479c2351dc5fa4ad15641367a4063dcf&oe=58D056EF",
                  lng: 41.403609,                  
                  lat: 2.174448,
                  description: "Viaje a moquegua con la familia 1",
                  createdOn: "2016-11-20T05:59:56.094Z"
            },{
                  _id : "1232asd3",
                  user: "12321sad3",
                  name: "Harold Caceres",
                  avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/13177730_1178945592124336_1246955548052490589_n.jpg?oh=1bb88385ac37502706735b25c78af998&oe=58BEBFFB",
                  lng: -71.5558935,
                  lat: -16.4185013,
                  description: "Viaje a moquegua con la familia 1",
                  createdOn: "2016-11-21T05:59:56.094Z"
            },
            {
                  _id : "121231",
                  user: "asdsad",
                  name: "Angel luna",
                  avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/14364647_1212464612139666_8170778031067824203_n.jpg?oh=dc4ab512c6160457826b2fae1aaa7cfb&oe=58CF044B",
                  lng: -71.5508935,
                  lat: -16.4165013,
                  description: "Viaje a moquegua con la familia 2",
                  createdOn: "2016-11-22T05:59:56.094Z"
            },

            {
                  _id : "121231",
                  user: "1232324",
                  name: "Mauricio Maldonado",
                  avatar: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-1/p32x32/12744153_960434714030802_8163824430887150015_n.jpg?oh=8e0177c4d190965347cdc3455a08126f&oe=58BFABBB",
                  lng: -71.5608935,
                  lat: -16.4265013,
                  description: "Viaje a moquegua con la familia 3",
                  createdOn: "2016-11-23T05:59:56.094Z"
            }
      ];

     


      $scope.routeLocations = locations;
      for (var i = 0; i < locations.length; i++) {
            $scope.routeLocations[i].loc = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location="+locations[i].lng+","+locations[i].lat+"&heading=100&pitch=28&scale=2&key=AIzaSyB8Sy_Czas5ilPczOe4q7uhJDmS66VT064";
      }

      console.log($scope.routeLocations);

});