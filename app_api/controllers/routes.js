var mongoose = require('mongoose');
var Loc = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.createRoute = function(req, res) {
  if (req.params.userid) {
    Loc
      .findById(req.params.userid)
      .select('routes')
      .exec(
        function(err, user) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            doAddRoute(req, res, user);
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, userid required"
    });
  }
};

var doAddRoute = function(req, res, user) {
  if (!user) {
    sendJsonResponse(res, 404, "userid not found");
  } else {
    user.routes.push({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      rating: 3,
      numberRating: 0
    });
    user.save(function(err, user) {
      var thisRoute;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
      	thisRoute = user.routes[user.routes.length - 1];
        sendJsonResponse(res, 201, thisRoute);
      }
    });
  }
};

module.exports.updateRoute = function(req, res) {
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
  Loc.findOneAndUpdate(
    { "_id": req.params.userid, "routes._id": req.params.routeid },
    { 
        "$set": {
            "routes.$.name": req.body.name,
            "routes.$.description": req.body.description
        }
    },
    function(err,user) {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, user);
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
  Loc
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

//Function to delete a specified user's specified route 
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
  Loc.update(
    { 
      "_id": req.params.userid 
    },
    { 
      "$pull": { 
        "routes": { 
          "_id": req.params.routeid 
        } 
      } 
    },
    function(err, user) { 
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

