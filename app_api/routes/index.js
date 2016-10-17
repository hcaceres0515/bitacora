var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlRoutes = require('../controllers/routes');
var ctrlLocations = require('../controllers/locations');


router.get('/getUsers', ctrlUsers.getAllUsers);
router.post('/createUser', ctrlUsers.createUser);
router.put('/updateUser/:userid', ctrlUsers.updateUser);
router.get('/getUser/:userid', ctrlUsers.getUser);
router.delete('/deleteUser/:userid', ctrlUsers.deleteUser);

router.post('/users/:userid/routes', ctrlRoutes.routesCreate);

router.post('/users/:userid/routes/:routeid/locations', ctrlLocations.locationsCreate);


/*router.get('/getlocations', ctrlLocations.getAllLocations);
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);*/

module.exports = router;
