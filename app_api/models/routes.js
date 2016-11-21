var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    description: String,
    lon: { type: Number, required : true},
    lat: { type: Number, required : true},
    image: String
});

var reviewSchema = new mongoose.Schema({
    authorId: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var locationSchema = new mongoose.Schema({    
    name: String,
    lon: { type: Number, required : true},
    lat: { type: Number, required : true},
    description: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    tags: [String],
    createdOn: {
        type: Date,
        "default": Date.now
    }, 
    location: [locationSchema],
    images: [imageSchema],
    reviews: [reviewSchema]
});

mongoose.model('Route', routeSchema);