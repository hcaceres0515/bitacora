/* GET 'Add review' page */
module.exports.home = function(req, res) {
    res.render('index', {
        title: 'Bitacora'       
    });
};


module.exports.map = function(req, res){
	res.render('map_bitacora', {
        title: 'Map Bitacora'       
    });	
}