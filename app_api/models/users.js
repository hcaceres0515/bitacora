var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
    name: String,
    lon: Number,
    lat: Number,
    description: String,    
});

var routeSchema = new mongoose.Schema({
    name: String,
    description: String,
    numberRating: Number,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    date: {
        type: Date,
        "default": Date.now
    },
    locations: [locationSchema]
});

var userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    nick: String,
    password: String,
    description: String,
    routes: [routeSchema]
});

mongoose.model('User', userSchema);