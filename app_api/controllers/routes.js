var mongoose = require('mongoose');
var Rou = mongoose.model('Route');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


//update array of routes in the user's document
var addRouteToUser = function(req, res, newRoute) {
    User.update(
      {"_id": req.params.userid},
      { 
        "$addToSet": 
        {
          "routes": (String)(newRoute)
        }
      },
      function(err,user) {
        if (err) {
          console.log("404" +  err);
        } else {
          console.log("200" + newRoute);
        }  
      }
    );
};


//Update array of routes in the user's document
var removeRouteToUser = function(req, res, newRoute) {
    User.update(
      { "_id": req.params.userid},
      { 
        "$pull": 
        {
            "routes": (String)(req.params.routeid)
        }
      },
      function(err, user) {
        if (err) {
          console.log("404" +  err);
        } else {
          console.log("200" + user);
        }  
      }
    );
}


//Calculate distance from the first location until the last location
var doCalculateDistance = function(route){
  var total = 0;
  var rpta = {"distance" : total};
  if (route.locations) {
    for (var i = 1; i < route.locations.length; i++) {
      rpta.total = rpta.total + getDistanceFromLatLonInKm(route.locations[i-1].lat, route.locations[i-1].lon, 
      route.locations[i].lat, route.locations[i].lon);
      //console.log(rpta.total);
    }
  }  
  return rpta;
};

//Get nearby routes 
var doGetNearbyRoutes = function(routes, point){
  // radius of 1 Km
  var MAX_DISTANCE = 1;
  var rpta = [];
  for(i=0;i<routes.length;i++){
    //number of locations for each route
    var numberLoc = routes[i].locations.length;
    if (numberLoc > 0) {
      console.log(point.lat);
      console.log(point.lon);
      console.log(routes[i].locations[numberLoc-1].lat);
      console.log(routes[i].locations[numberLoc-1].lon);
      console.log(numberLoc);

      var distance = getDistanceFromLatLonInKm(point.lat, point.lon, routes[i].locations[numberLoc-1].lat, routes[i].locations[numberLoc-1].lon);
    
      if (distance < MAX_DISTANCE){
        rpta.push({
          user: routes[i].user,
          name: routes[i].name,
          description: routes[i].description,
          rating: routes[i].rating,
          numberRating: routes[i].numberRating,
          date : routes[i].date,
          locations: routes[i].locations
        });  
      }      
    }    
  }
  return rpta;
};

//Get distance between two points in KM
var getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
  console.log(lat1);
  console.log(lon1);
  console.log(lat2);
  console.log(lon2);
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
};

var deg2rad = function(deg) {
  return deg * Math.PI / 180;
};

//Get all routes 
module.exports.getRoutes = function (req, res){
  Rou
    .find()
    .exec(function(err, routes) {
      if (!routes) {
        sendJsonResponse(res, 404, {
          "message": "routes not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJsonResponse(res, 404, err);
        return;
      }
      //console.log(routes);
      sendJsonResponse(res, 200, routes);
    }); 
  return;
};


//Get a specific route by its id
module.exports.getRoute = function (req, res) { 
  if (req.params && req.params.routeid) {
    Rou
      .findById(req.params.routeid)
      .exec(function(err, route){
        if (!route) {
          sendJsonResponse(res, 404, {
            "message": "routeid not found"
          });
        }
        else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        } 
        sendJsonResponse(res, 200, route);
    }); 
  } else {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
  } 
};

//Get all routes which own a specific user
module.exports.getRoutesByUser = function (req, res) { 
  if (req.params && req.params.userid) {
    Rou
      .find({user: req.params.userid})
      .exec(function(err, routes){
        if (!routes) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
        }
        else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        } 
        sendJsonResponse(res, 200, routes);
    }); 
  } else {
    sendJsonResponse(res, 404, {
      "message": "No userid in request"
    });
  } 
};


//Get the distance from specific route
module.exports.getDistance = function (req, res) { 
  if (req.params && req.params.routeid) {
    Rou
      .findById(req.params.routeid)
      .exec(function(err, route){
        if (!route) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
        }
        else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        var distance = doCalculateDistance(route);
        sendJsonResponse(res, 200, distance);
    }); 
  } else {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
  } 
};


//Get routes closed to specific longitude and latitude
module.exports.getNearbyRoutes = function (req, res) { 
  if (req.params && req.params.lon && req.params.lat) {
    Route 
      .find()
      .exec(function(err, routes){
        if (!routes) {
          sendJsonResponse(res, 404, {
            "message": "routes not found"
          });
        }
        else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        var point = {lon: req.params.lon, lat: req.params.lat};
        var nearbyRoutes = doGetNearbyRoutes(routes, point);
        sendJsonResponse(res, 200, nearbyRoutes);
    }); 
  } else {
    sendJsonResponse(res, 404, {
      "message": "Neither longitude nor latitude"
    });
  } 
};

//Create new route 
//it owns a specified user
module.exports.createRoute = function(req, res) {
  if (req.params && req.params.userid) {
    var _idNew = 0;
    console.log(_idNew);
    Rou.create({
      name : req.body.name,
      description: req.body.description,
      tags : req.body.tags.split(","),
      user: req.params.userid
    },function(err, route){
      if (err){
        sendJsonResponse(res, 400, err);
        return;
      }else{
        sendJsonResponse(res, 201, route);
        _idNew = route._id;
        //console.log(_idNew);
        addRouteToUser(req, res, _idNew);
      }
    });
  }
  else {
    sendJsonResponse(res, 404, {
      "message": "userid is required"
    });
  }
};


//Update a specific route
module.exports.updateRoute = function(req, res) {
  if (!req.params.routeid) {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
    return;
  }
  Rou.findOneAndUpdate(
    { "_id": req.params.routeid},
    { 
        "$set": {
            "name": req.body.name,
            "description": req.body.description
        }
    },
    function(err, route) {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, route);
      }  
    }
  );
};

module.exports.updateRatingRoute = function(req, res) {
  if (!req.params.userid) {
    sendJsonResponse(res, 404, {
      "message": "userid is required"
    });
    return;
  }
  if (!req.params.routeid) {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
    return;
  }
  if (!req.params.newrating) {
    sendJsonResponse(res, 404, {
      "message": "newrating is required"
    });
    return;
  }
  Rou
    .findById(req.params.userid)
    .exec(
      function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        else{
          doUpdateRating(req, res, user);
        }
      }
  );
};

var doUpdateRating = function(req, res, user) {
  if (!user) {
    sendJsonResponse(res, 404, "userid not found");
  }
  else {
    var position;
    for (var i = 0; i < user.routes.length; i++){
      if (user.routes[i]._id == req.params.routeid){
        position = i;
        break;
      }
    }
    console.log("position: " + position);
    console.log("userid: " + req.params.userid);
    console.log("routeid: " + req.params.routeid);
    console.log("newrating: " + req.params.newrating);
    var num = user.routes[position].numberRating * user.routes[position].rating + (Number)(req.params.newrating);
    var den = user.routes[position].numberRating + 1;
    var newValue = num / den; 
    console.log("num: " + num);
    console.log("den: " + den);
    console.log("newvalue: " + newValue);
    user.routes[position].rating = newValue;
    user.routes[position].numberRating = user.routes[position].numberRating + 1;
    user.save(function(err) {
      if (err) {
        console.log(err);
        sendJsonResponse(res, 404, err);
      } else {
        console.log("Average rating updated to", newValue);
        sendJsonResponse(res, 200, user);
      }
    });
  }
};


//Delete a specific user's specific route 
module.exports.deleteRoute = function (req, res) { 
  if (!req.params.userid) {
    sendJsonResponse(res, 404, {
      "message": "userid is required"
    });
    return;
  }
  if (!req.params.routeid) {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
    return;
  }
  Rou
    .findByIdAndRemove(req.params.routeid)
    .exec(
      function(err, route){
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
        removeRouteToUser(req, res);
      }
    );    
};
