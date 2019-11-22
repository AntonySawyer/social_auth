const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const fbConfig = require('../config/facebook.json');

passport.use(new FacebookStrategy(fbConfig,
  function (accessToken, refreshToken, profile, done) {
    const userLink = `https://www.facebook.com/profile.php?id=${profile.id}`;
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