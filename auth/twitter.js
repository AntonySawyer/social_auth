const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');
const twitterConfig = require('../config/twitter.json');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (data, fn) {
  User.findOne({
    _id: data.doc._id
  }, (err, user) => fn(err, user));
});

passport.use(new TwitterStrategy(twitterConfig,
  function (accessToken, refreshToken, profile, done) {
    const userLink = `https://www.twitter.com/profile.php?id=${profile.id}`;
    User.findOrCreate({
      link: userLink
    }, {
      username: profile.displayName,
      link: userLink,
      status: 'active'
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;