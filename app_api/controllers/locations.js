var mongoose = require('mongoose');
var Loc = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.locationsCreate = function(req, res) {
  if (req.params.userid) {
    Loc
      .findById(req.params.userid)
      .select('routes')
      .exec(
        function(err, user) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddLocation01(req, res, user);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid required"
    });
  }
};

var doAddLocation01 = function(req, res, user) {
  if (!user) {
    sendJSONresponse(res, 404, "userid not found");
  } else {

    if (req.params.routeid) {
    	console.log("routeid: ", req.params.routeid); 
    	var position;
    	for (var i = 0; i < user.routes.length; i++){
 				if (user.routes[i]._id == req.params.routeid){
    			position = i;
    			break;
  			}
			}
    	console.log("position: ", position); 
      if(position == -1){
      	sendJSONresponse(res, 404, "routeid not found");
      } 
      else{
      	doAddLocation02(req, res, user, position);
      }
    } 
    else {
      sendJSONresponse(res, 404, {
        "message": "Not found, routeid required"
      });
    }
    
  }
};

var doAddLocation02 = function(req, res, user, position) {
  console.log("USER: ", user);
  user.routes[position].locations.push({
  	name: req.body.name,
    lon: req.body.lon,
    lat: req.body.lat,
    description: req.body.description
  });
  console.log("USER: ", user);
  user.save(function(err, user) {
    var thisLocation;
    if (err) {
      sendJSONresponse(res, 400, err);
    } else {

    	thisLocation = user.routes[position].locations[user.routes.length - 1];
      sendJSONresponse(res, 201, thisLocation);
    }
  });
};