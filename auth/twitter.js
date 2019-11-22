const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');
const twitterConfig = require('../config/twitter.json');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({
    _id: id.doc._id
  }, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy(twitterConfig,
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      name: profile.displayName
    }, {
      name: profile.displayName,
      userid: profile.id
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;