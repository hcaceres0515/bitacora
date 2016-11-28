var mongoose = require('mongoose');
var Rou = mongoose.model('Route');


var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


var doAddImage = function(req, res, route) {
  if (!route) {
    sendJsonResponse(res, 404, "routeid not found");
    return;
  } else {
    route.images.push({
      description: req.body.description,
      lon: req.body.lon,
      lat: req.body.lat,
      image: req.body.image
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



//Get a set of images of a specific route
module.exports.getImages = function (req, res) { 
  if (req.params && req.params.routeid) {
    Rou
      .findById(req.params.routeid)
      .select('images')
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


//Create a new image of a specific route
module.exports.createImage = function(req, res) {
  if (req.params.routeid) {
    Rou
      .findById(req.params.routeid)
      .select('images')
      .exec(
        function(err, route) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            doAddImage(req, res, route);
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
  }
};

///Delete a specific image from a specific route
module.exports.deleteImage = function (req, res) { 
  if (!req.params.routeid) {
    sendJsonResponse(res, 404, {
      "message": "routeid is required"
    });
    return;
  }
  if (!req.params.imageid) {
    sendJsonResponse(res, 404, {
      "message": "imageid is required"
    });
    return;
  }
  Rou.update(
    { 
      "_id": req.params.routeid 
    },
    { 
      "$pull": { 
        "images": {
          "_id": req.params.imageid 
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