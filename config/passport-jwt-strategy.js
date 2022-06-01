const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Crypto = require('crypto-js');

const option = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret',
};

const User = require('../models/user');

passport.use(
  new JWTStrategy(option, (payload, done) => {
    User.findById(payload._id, { password: 0 }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
