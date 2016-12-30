var express = require('express');
var router = express.Router();

//var ctrlMain = require('../controllers/main');

var ctrlLocations = require('../controllers/locations');
var crtlOthers = require('../controllers/others');
var ctrlPages = require('../controllers/pages');
var ctrlRegLog = require('../controllers/reglog');

/*Locations pages*/

router.get('/', ctrlPages.angularApp);
//router.get('/', ctrlPages.home);
router.get('/map', ctrlPages.map);
router.get('/mapSearch/:lat/:lng/:address', ctrlPages.mapSearch);
router.get('/route', ctrlPages.infoRoute);


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

/*registro y login*/
router.get('/', ctrlRegLog.index);
router.get('/login', ctrlRegLog.login);
router.get('/register', ctrlRegLog.register);

// POST
//router.post('/register', ctrlRegLog.registerUser);


module.exports = router;

