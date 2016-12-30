var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    description: String,
    coords: { 
        type: [Number], // Always store coordinates longitude, latitude order.
        index: '2dsphere'
    },
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
    coords: {
        type: [Number], // Always store coordinates longitude, latitude order.
        index: '2dsphere'
    },
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
    user: { type: String, required : true},
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
    coordsFinal: {
        type: [Number], // Always store coordinates longitude, latitude order.
        index: '2d'
    },
    locations: [locationSchema],
    images: [imageSchema],
    reviews: [reviewSchema]
});

mongoose.model('Route', routeSchema);