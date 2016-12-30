/* GET 'home' page */

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    res.render('index', {
        title: 'Bitacora'       
    });
};
