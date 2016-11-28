var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlRoutes = require('../controllers/routes');
var ctrlLocations = require('../controllers/locations');
var ctrlImages = require('../controllers/images');


///USERS
router.get('/users', ctrlUsers.getUsers);
router.get('/users/:userid', ctrlUsers.getUser);
router.post('/users', ctrlUsers.createUser);
router.put('/users/:userid', ctrlUsers.updateUser);
router.delete('/users/:userid', ctrlUsers.deleteUser);

///ROUTES
router.get('/routes', ctrlRoutes.getRoutes);
router.get('/routes/:routeid', ctrlRoutes.getRoute);
router.get('/routes/users/:userid', ctrlRoutes.getRoutesByUser);
router.get('/routes/:routeid/distance', ctrlRoutes.getDistance);
router.get('/routes/:lon/:lat', ctrlRoutes.getNearbyRoutes);
router.post('/users/:userid/routes', ctrlRoutes.createRoute);
router.put('/routes/:routeid', ctrlRoutes.updateRoute);
// router.put('/routes/:routeid/:newrating', ctrlRoutes.updateRatingRoute);
router.delete('/users/:userid/routes/:routeid', ctrlRoutes.deleteRoute);


///LOCATIONS
router.get('/routess/:routeid/locations', ctrlLocations.getLocations);
router.post('/routes/:routeid/locations', ctrlLocations.createLocation);
router.put('/routes/:routeid/locations/:locationid', ctrlLocations.updateLocation);
router.delete('/routes/:routeid/locations/:locationid', ctrlLocations.deleteLocation);

///IMAGES
router.get('/routess/:routeid/images', ctrlImages.getImages);
router.post('/routes/:routeid/images', ctrlImages.createImage);
router.delete('/routes/:routeid/images/:imageid', ctrlImages.deleteImage);


module.exports = router;
