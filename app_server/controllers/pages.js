var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://bitacorasocial.herokuapp.com/";
}


/* GET 'Add review' page */
var renderHomepage = function(req, res, responseBody){
	res.render('index',{
		title:'Bitacora',
		users: responseBody
	});
}

module.exports.home = function(req, res) {
    var requestOptions, path;
    path = '/api/users';
    
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},        
    }

    request(
        requestOptions, function (err, response, body){
            renderHomepage(req, res, body);
        }
    ); 
};


module.exports.map = function(req, res){
	res.render('map_bitacora', {
        title: 'Map Bitacora'       
    });	
}

module.exports.mapSearch = function(req, res){
	res.render('map_search', {
        title: 'Map Bitacora'       
    });	
}