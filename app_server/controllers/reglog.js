var mongoose = require('mongoose');
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

exports.registerUser = function(req, res) {

  // pull the form variables off the request body
  var username = req.body.username;
  var password = req.body.password;

  // additional registration information
  var additional = {
    Email: req.body.email,
    DisplayName: req.body.display
  }

};
/*
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

};*/

  // register the user.
