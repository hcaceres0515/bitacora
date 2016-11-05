var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    nick: String,
    password: String,
    description: String,
    routes: [Number]
});

mongoose.model('User', userSchema);