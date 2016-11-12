/* GET 'Add review' page */
module.exports.home = function(req, res) {
    res.render('index', {
        title: 'Bitacora'       
    });
};
