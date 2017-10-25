var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        firstnameField: 'firstname',
        lastnameField: 'lastname',
        emailField: 'email',
        roleField: 'role',
        passReqToCallback: true
    }, (req, username, password, firstname, lastname, email, roule, done) => {
        process.nextTick(function () {
            User.findOne({ 'local.username': username }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false);
                } else {
                    var newUser = new User();
                    newUser.local.username = username
                    newUser.local.password = newUser.generateHash(password)
                    newUser.local.firstname = firstname
                    newUser.local.lastname = lastname
                    newUser.local.email = email
                    newUser.local.role = role

                    newUser.save((err) => {
                        if(err) console.log(err)
                        return done(null, newUser)
                    })
                }

            });

        });
    }))
}