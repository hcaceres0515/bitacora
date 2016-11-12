var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    display: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},   
    email: String
});

mongoose.model('Users', userSchema);