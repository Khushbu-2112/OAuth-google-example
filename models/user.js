const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

const User = mongoose.model('User', GoogleUserSchema);

module.exports = User;
// way 1 like this export n just require
// way 2 like passjwt folder dont export but model in another