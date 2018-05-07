const passport = require('passport');
const mongoose = require('mongoose');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy({
      clientID: keys.googleID,
      clientSecret: keys.googleSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleID: profile.id
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleID: profile.id
      }).save();
      done(null, user);
    }
  )
);