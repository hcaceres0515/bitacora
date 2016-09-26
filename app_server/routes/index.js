var express = require('express');
var router = express.Router();

//var ctrlMain = require('../controllers/main');

var ctrlLocations = require('../controllers/locations');
var crtlOthers = require('../controllers/others');

/*Locations pages*/

router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

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
