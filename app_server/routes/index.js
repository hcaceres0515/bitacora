var express = require('express');
var router = express.Router();

//var ctrlMain = require('../controllers/main');

var ctrlLocations = require('../controllers/locations');
var crtlOthers = require('../controllers/others');
var ctrlPages = require('../controllers/pages');

/*Locations pages*/

router.get('/', ctrlPages.home);
router.get('/map', ctrlPages.map);


/* Other pages */
router.get('/about', crtlOthers.about);

/*
var homepageController = function (req, res){
  res.render('index', {title: 'Loc8r'});
};
// GET home page. 
router.get('/', homepageController);
*/

//router.get('/', ctrlMain.index);

module.exports = router;
