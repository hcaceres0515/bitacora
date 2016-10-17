var mongoose = require('mongoose');
var Loc = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.routesCreate = function(req, res) {
  if (req.params.userid) {
    Loc
      .findById(req.params.userid)
      .select('routes')
      .exec(
        function(err, user) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddRoute(req, res, user);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, userid required"
    });
  }
};

var doAddRoute = function(req, res, user) {
  if (!user) {
    sendJSONresponse(res, 404, "userid not found");
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
        sendJSONresponse(res, 400, err);
      } else {
      	thisRoute = user.routes[user.routes.length - 1];
        sendJSONresponse(res, 201, thisRoute);
      }
    });
  }
};