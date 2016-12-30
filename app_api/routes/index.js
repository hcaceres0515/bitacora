var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

var ctrlUsers = require('../controllers/users');
var ctrlRoutes = require('../controllers/routes');
var ctrlLocations = require('../controllers/locations');
var ctrlAuth = require('../controllers/authentication');

///USERS
router.get('/users', ctrlUsers.getUsers);
router.get('/users/:userid', auth,ctrlUsers.getUser);
router.post('/users', ctrlUsers.createUser);
router.put('/users/:userid',auth, ctrlUsers.updateUser);
router.delete('/users/:userid', auth,ctrlUsers.deleteUser);

///ROUTES

/*router.post('/route', ctrlRoutes.createRoute);*/
router.get('/routes', ctrlRoutes.getRoutes);
router.get('/user/route/:userid',auth, ctrlRoutes.getRoute);
router.post('/user/:userid/route',auth ,ctrlRoutes.createUserRoute);
router.put('/users/:userid/routes/:routeid', auth,ctrlRoutes.updateRoute);
router.put('/users/:userid/routes/:routeid/:newrating',auth, ctrlRoutes.updateRatingRoute);
router.delete('/users/:userid/routes/:routeid',auth,ctrlRoutes.deleteRoute);


///LOCATIONS
router.post('/users/:userid/routes/:routeid/locations',auth ,ctrlLocations.locationsCreate);
router.delete('/users/:userid/routes/:routeid/locations/:locationid',auth,ctrlLocations.deleteLocation);


router.get('/locations', ctrlLocations.locationsListByDistance);


//LOGIN AND REGISTER
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
