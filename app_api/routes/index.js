var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlRoutes = require('../controllers/routes');
var ctrlLocations = require('../controllers/locations');


///USERS
router.get('/users', ctrlUsers.getUsers);
router.get('/users/:userid', ctrlUsers.getUser);
router.post('/users', ctrlUsers.createUser);
router.put('/users/:userid', ctrlUsers.updateUser);
router.delete('/users/:userid', ctrlUsers.deleteUser);

///ROUTES

/*router.post('/route', ctrlRoutes.createRoute);*/
router.get('/routes', ctrlRoutes.getRoutes);
router.get('/search_routes/:lng/:lat', ctrlRoutes.searchRoutesByDistance);
router.get('/user/route/:userid', ctrlRoutes.getRoute);
router.post('/user/:userid/route', ctrlRoutes.createUserRoute);
router.put('/users/:userid/routes/:routeid', ctrlRoutes.updateRoute);
router.put('/users/:userid/routes/:routeid/:newrating', ctrlRoutes.updateRatingRoute);
router.delete('/users/:userid/routes/:routeid', ctrlRoutes.deleteRoute);


///LOCATIONS
router.post('/users/:userid/routes/:routeid/locations', ctrlLocations.locationsCreate);
router.delete('/users/:userid/routes/:routeid/locations/:locationid', ctrlLocations.deleteLocation);


router.get('/locations', ctrlLocations.locationsListByDistance);

module.exports = router;
