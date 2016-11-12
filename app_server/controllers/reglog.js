var request = require('request');
var apiOptions = {
  server : "http://127.0.0.1:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://agile-dusk-91517.herokuapp.com";
}
//var use = mongoose.model('user');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.redirect('login');
};

/*
 * GET login page.
 */

exports.login = function(req, res) {
  res.render('login');
};

/*
 * GET register page.
 */

exports.register = function(req, res) {
  res.render('register');
};

/*
 * POST register user.
 */
/*
exports.registerUser = function(req, res) {

  // pull the form variables off the request body
  var username = req.body.username;
  var password = req.body.password;

  // additional registration information
  var additional = {
    Email: req.body.email,
    DisplayName: req.body.display
  }

};*/
exports.registerUser = function(req, res) {

  // validate the input
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('display', 'DisplayName is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  console.log(errors);  

  if (errors) {
    res.render('register', { flash: { type: 'alert-danger', messages: errors }});
  }
  else {
    res.render('register', { flash: { type: 'alert-success', messages: [ { msg: 'No errors!' }]}});
  }

};

 // register the user.
  /*agregando comentario*/
module.exports.doAddregister = function(req, res){
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/register";
  postdata = {
    display: req.body.display,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.display || !postdata.username || !postdata.password || !postdata.email) {
    res.redirect('/location/register');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/login');
        } else if (response.statusCode === 400 && body.name && body.name ===
          "ValidationError" ) {
           res.redirect('/location/register');
        } else {
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};
