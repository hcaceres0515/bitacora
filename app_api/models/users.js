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