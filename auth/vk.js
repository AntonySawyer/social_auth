const passport = require('passport')
const VkStrategy = require('passport-vkontakte').Strategy;
const User = require('../models/User');
const vkConfig = require('../config/vk.json');

passport.use(new VkStrategy(vkConfig,
  function (accessToken, refreshToken, profile, done) {
    const userLink = `https://vk.com/id${profile.id}`;
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