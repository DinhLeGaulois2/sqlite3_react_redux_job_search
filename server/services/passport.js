const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const db = require("../models");

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  db.user.findOne({ where: { email: email } })
    .then(user => {
      user.validatePwd(password, function (err, isMatch) {
        if (err) return done(err);
        if (!isMatch) return done(null, false);
        return done(null, user);
      })
    }).catch(err => done(err))
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {

  db.user.findById(payload.sub).then(user => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  }).catch(err => done(err, false))
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
