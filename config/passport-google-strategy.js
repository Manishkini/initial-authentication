const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '976295048057-fg04q3us7jbr91dvgev8aamucmflg8kj.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:9633/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne(
        {
          email: profile.emails[0].value,
        },
        (err, user) => {
          if (err) {
            console.log('error while finding user google passport OAuth');
            return done(err);
          }

          if (user) {
            return done(null, user);
          } else {
            User.create(
              {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
              },
              (err, newUser) => {
                if (err) {
                  console.log(
                    'error while creating user google passport OAuth'
                  );
                  return;
                }

                return done(null, newUser);
              }
            );
          }
        }
      );
    }
  )
);
