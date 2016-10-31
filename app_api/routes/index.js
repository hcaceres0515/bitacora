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

// router.get('/users/:userid/routes', ctrlRoutes.getRoutes);
router.post('/users/:userid/routes', ctrlRoutes.createRoute);
router.put('/users/:userid/routes/:routeid', ctrlRoutes.updateRoute);
router.put('/users/:userid/routes/:routeid/:newrating', ctrlRoutes.updateRatingRoute);
router.delete('/users/:userid/routes/:routeid', ctrlRoutes.deleteRoute);


///LOCATIONS
router.post('/users/:userid/routes/:routeid/locations', ctrlLocations.locationsCreate);
router.delete('/users/:userid/routes/:routeid/locations/:locationid', ctrlLocations.deleteLocation);


/*
router.get('/getlocations', ctrlLocations.getAllLocations);
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);
*/
module.exports = router;
