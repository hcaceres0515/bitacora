var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// var theEarth = (function() {
//   var earthRadius = 6371; // km, miles is 3959

//   var getDistanceFromRads = function(rads) {
//     return parseFloat(rads * earthRadius);
//   };

//   var getRadsFromDistance = function(distance) {
//     return parseFloat(distance / earthRadius);
//   };

//   return {
//     getDistanceFromRads: getDistanceFromRads,
//     getRadsFromDistance: getRadsFromDistance
//   };
// })();


// Get all users
module.exports.getUsers = function (req, res){

  console.log('Finding users details', req.params);
  
  User
    .find()
    .exec(function(err, Useration) {
      if (!Useration) {
        sendJsonResponse(res, 404, {
          "message": "Userationid not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJsonResponse(res, 404, err);
        return;
      }
      console.log(Useration);
      sendJsonResponse(res, 200, Useration);
    });
  
  return;

}


//Function for add User without routes
module.exports.createUser = function(req, res){
	User.create({
		name: req.body.name, 
		avatar: req.body.avatar,
    image: req.body.image,
		nick: req.body.nick,
    password: req.body.password,
    description: req.body.description
	},function(err, user){
		if (err){
      sendJsonResponse(res, 400, err);
    }else{
      sendJsonResponse(res, 201, user);
    }
	});
};

//FUnciton to update a User
module.exports.updateUser = function (req, res) { 
  if (!req.params.userid) {
    sendJsonResponse(res, 404, {
      "message" : "Not found, userid is required"});
    return;
  }
  User
    .findById(req.params.userid)
    .select('-routes')
    .exec(
      function(err, user){
        if (!user) {
          sendJsonResponse(res, 404, {
            "message" : "userid not found"
          });
          return;
        }
        else if (err) {
          sendJsonResponse(res, 200, err);
          return;
        }
        user.name = req.body.name;
        user.avatar = req.body.avatar;
        user.nick = req.body.nick;
        user.password = req.body.password;
        user.description = req.body.description;
        user.save(function(err, user){
          if (err) {
            sendJsonResponse(res, 404, err);
          }
          else{
            sendJsonResponse(res, 200, user);
          }
        });       
      }
  );
};

//Function to get a specified user
module.exports.getUser = function (req, res) { 
  if (req.params && req.params.userid) {
    User 
      .findById(req.params.userid)
      .exec(function(err, user){
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
        }
        else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        } 
        sendJsonResponse(res, 200, user);
    }); 
  } else {
    sendJsonResponse(res, 404, {
      "message": "No userid in request"
    });
  } 
};

//Function to delete a specified user
module.exports.deleteUser = function (req, res) { 
  var userid = req.params.userid;
  if (userid) {
    User
      .findByIdAndRemove(userid)
      .exec(
        function(err, user){
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
    );
  }
  else{
    sendJsonResponse(res, 404, {
      "message": "No userid"
    });
  }
};

