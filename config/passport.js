const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');

const authConfig = require('./auth');

const options = {
    clientID        : authConfig.googleAuth.clientId,
    clientSecret    : authConfig.googleAuth.clientSecret,
    callbackURL     : authConfig.googleAuth.callBackUrl,
};

function callback(token, refreshToken, profile, done) {

    process.nextTick( ()=> {
        User.findOne({'google.id': profile.id}, (err,user)=> {
            if(err)
                return done(err,false);
            if(user){
                return done(null, user);
            }
            else{
                // return done(null, false);
                var newUser = new User();
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.google.name  = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                
                newUser.save( (err)=> {
                    if(err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });

}

module.exports = function(passport){

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy(options, callback));

};