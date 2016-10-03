var mongoose = require('mongoose');
var Loc = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
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
        sendJSONresponse(res, 404, {
          "message": "locationid not found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(location);
      sendJSONresponse(res, 200, location);
    });
  
  return;

}
