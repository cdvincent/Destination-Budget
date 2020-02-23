var bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

    passport.use(new LocalStrategy(
        {
            usernameField: "username",
        },
        function(username, password, done) {
            db.User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, { message: "Username does not exist"
                });
            } else if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password"
                });
            };
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  module.exports = passport;