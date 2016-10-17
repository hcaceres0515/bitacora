var mongoose = require('mongoose');
var Loc = mongoose.model('User');

var sendJsonresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var theEarth = (function() {
  var earthRadius = 6371; // km, miles is 3959

  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();

module.exports.getAllUsers = function (req, res){

  console.log('Finding users details', req.params);
  
  Loc
    .find()
    .exec(function(err, location) {
      if (!location) {
        sendJsonresponse(res, 404, {
          "message": "locationid not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJsonresponse(res, 404, err);
        return;
      }
      console.log(location);
      sendJsonresponse(res, 200, location);
    });
  
  return;

}


//Function for add User
module.exports.createUser = function(req, res){
	Loc.create({
		name: req.body.name, 
		avatar: req.body.avatar,
		nick: req.body.nick,
    password: req.body.password,
    description: req.body.description
	},function(err, user){
		if (err){
      sendJsonresponse(res, 400, err);
    }else{
      sendJsonresponse(res, 201, user);
    }
	});
};

//FUnciton to update a User
module.exports.updateUser = function (req, res) { 
  if (!req.params.userid) {
    sendJsonresponse(res, 404, {
      "message" : "Not found, userid is required"});
    return;
  }
  Loc
    .findById(req.params.userid)
    .select('-routes')
    .exec(
      function(err, user){
        if (!user) {
          sendJsonresponse(res, 404, {
            "message" : "userid not found"
          });
          return;
        }
        else if (err) {
          sendJsonresponse(res, 200, err);
          return;
        }
        user.name = req.body.name;
        user.avatar = req.body.avatar;
        user.nick = req.body.nick;
        user.password = req.body.password;
        user.description = req.body.description;
        user.save(function(err, user){
          if (err) {
            sendJsonresponse(res, 404, err);
          }
          else{
            sendJsonresponse(res, 200, user);
          }
        });       
      }
  );
};

//Function to get a specified user
module.exports.getUser = function (req, res) { 
  if (req.params && req.params.userid) {
    Loc 
      .findById(req.params.userid)
      .exec(function(err, user){
        if (!user) {
          sendJsonresponse(res, 404, {
            "message": "userid not found"
          });
        }
        else if (err) {
          sendJsonresponse(res, 404, err);
          return;
        } 
        sendJsonresponse(res, 200, user);
    }); 
  } else {
    sendJsonresponse(res, 404, {
      "message": "No userid in request"
    });
  } 
};

//Function to delete a specified user
module.exports.deleteUser = function (req, res) { 
  var userid = req.params.userid;
  if (userid) {
    Loc
      .findByIdAndRemove(userid)
      .exec(
        function(err, user){
          if (err) {
            sendJsonresponse(res, 404, err);
            return;
          }
          sendJsonresponse(res, 204, null);
        }
    );
  }
  else{
    sendJsonresponse(res, 404, {
      "message": "No userid"
    });
  }
};
