const express = require('express');
const router = express.Router();
const passportFacebook = require('../auth/facebook');
const passportTwitter = require('../auth/twitter');
const passportVk = require('../auth/vk');

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Authentication by:'
  })
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/facebook',
  passportFacebook.authenticate('facebook'));
router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', {
    failureRedirect: '/error'
  }),
  function (req, res) {
    res.redirect('/');
    res.redirect('/users');
  });


router.get('/twitter',
  passportTwitter.authenticate('twitter'));
router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', {
    failureRedirect: '/login',
    successRedirect: '/users'
  }),
);

router.get('/vk',
  passportVk.authenticate('vkontakte'));
router.get('/vk/callback',
  passportFacebook.authenticate('vkontakte', {
    successRedirect: '/users',
    failureRedirect: '/login'
  }),
);

module.exports = router;