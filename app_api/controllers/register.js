var mongoose = require('mongoose');
var Usr = mongoose.model('Users');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.registerCreate = function (req, res) {
 Usr.create({
    display: req.body.display,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }, function(err, users) {
    if (err) {
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, users);
    }
  });
};