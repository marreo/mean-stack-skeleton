var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

//MongoDb setup
require('./server/config/mongoose')(config);

var User = mongoose.model('User');

passport.use(new LocalStrategy(function (username, password, done) {
    console.log('Local Strat Called');
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (user.authenticate(password)) {
            return done(null, user);
        }

        return done(null, false, { message: 'Something else wrong' });
    });
}
    ));


passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function (id, done) {
    User.findOne({ _id: id }).exec(function (err, user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

require('./server/config/routes')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '....');