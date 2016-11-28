var mongoose = require('mongoose');
var Rou = mongoose.model('Route');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


var doAddLocation = function(req, res, route) {
  if (!route) {
    sendJsonResponse(res, 404, "routeiddddd not found");
    return;
  } else {
    route.location.push({
      name: req.body.name,
      lon: req.body.lon,
      lat: req.body.lat,
      description: req.body.description
    });
    route.save(function(err, routeNew) {
      if (err) {
        sendJsonResponse(res, 400, err);
      }
      else {
        sendJsonResponse(res, 201, routeNew);
      }
    });
  }
};




//Get a set of locations of a specific route
module.exports.getLocations = function (req, res) { 
  if (req.params && req.params.routeid) {
    Rou
      .findById(req.params.routeid)
      .select('location')
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
      "message": "No routeid in request"
    });
  } 
};

//Create a new location of a specific route
module.exports.createLocation = function(req, res) {
  if (req.params.routeid) {
    Rou
      .findById(req.params.routeid)
      .select('location')
      .exec(
        function(err, route) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            doAddLocation(req, res, route);
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
  }
};


//Update specific location from specific route
module.exports.updateLocation = function (req, res) { 
  if (!req.params.routeid) {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
    return;
  }
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {
      "message": "locationid is required"
    });
    return;
  }
    Rou.update(
      { "_id": req.params.routeid,
        "location._id": req.params.locationid
      }, 
      { 
        "$set": 
        {
          "location.$.name": req.body.name,
          "location.$.lon": req.body.lon,
          "location.$.lat": req.body.lat,
          "location.$.description": req.body.description
        }
      },
      function(err, route) {
        if (err)
        {
          sendJsonResponse(res, 404, err);
          console.log("111" + route);
        }
        else{
          sendJsonResponse(res, 200, route);
          console.log("222" + route);
        } 
      }
    );
};


///Delete a specific location from a specific route
module.exports.deleteLocation = function (req, res) { 
  if (!req.params.routeid) {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
    return;
  }
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {
      "message": "locationid is required"
    });
    return;
  }
  Rou.update(
    { 
      "_id": req.params.routeid 
    },
    { 
      "$pull": { 
        "location": {
          "_id": req.params.locationid 
        } 
      } 
    },
    function(err, route) { 
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        } 
        else {
          sendJsonResponse(res, 204, null);
        }
    }
  );
};

