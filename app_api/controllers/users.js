var mongoose = require('mongoose');
var User = mongoose.model('User');
var Route = mongoose.model('Route');


var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//Delete all routes which owned to specific user
var deleteRoutes = function(userid){
  if (userid) {
    Route.remove(
      {
        "user": userid 
      },
      function(err, route) { 
        if(err){
          console.log("404" + err);
          return;
        } 
        else {
          console.log("204");
        }
    });
  } else {
    console.log("404", {
      "message": "No userid"
    });
  } 
};

//Get all users
module.exports.getUsers = function (req, res){
  User
    .find()
    .exec(function(err, users) {
      if (!users) {
        sendJsonResponse(res, 404, {
          "message": "users not found"
        });
        return;
      } else if (err) {
        //console.log(err);
        sendJsonResponse(res, 404, err);
        return;
      }
      //console.log(users);
      sendJsonResponse(res, 200, users);
    });  
  return;
}


//Get a specific user
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
      "message": "userid is required"
    });
  } 
};

//Add new user without routes
module.exports.createUser = function(req, res){
	User.create({
    name: req.body.name, 
		email: req.body.email, 
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

//Update a specific user
module.exports.updateUser = function (req, res) { 
  if (!req.params || !req.params.userid) {
    sendJsonResponse(res, 404, {
      "message" : "userid is required"});
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
        user.email = req.body.email;
        // user.avatar = req.body.avatar;
        // user.image = req.body.image;
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


//Delete a specific user
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
          deleteRoutes(userid);
        }
    );
  }
  else{
    sendJsonResponse(res, 404, {
      "message": "userid is required"
    });
  }
};

