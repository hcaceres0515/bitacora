var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    image: String,
    nick: String,
    password: String,
    description: String,
    routes: [String]
});

mongoose.model('User', userSchema);