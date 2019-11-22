var express = require('express');
var router = express.Router();
const User = require('../models/User');

function getUserList(req, res) {
  const users = User.find({}, (err, result) => {
    if (err) {
      res.render('error', err)
    } else if (req.user.status === 'blocked') {
      res.render('error', {
        message: 'You are blocked!',
        error: {
          status: '',
          stack: ''
        }
      })
    } else {
      res.render('users', {
        users: result
      });
    }
  });
}

router.get('/', ensureAuthenticated, function (req, res, next) {
  const curDateTime = Date.now().toString();
  if (req.user.status === 'active') {
    User.update({
      link: req.user.link
    }, {
      last_login: curDateTime
    }, (err, user) => {
      if (err) {
        console.error(err);
      }
    });
  }
  getUserList(req, res);
});

router.post('/block', function (req, res, next) {
  req.body.forEach(id =>
    User.update({
      _id: id
    }, {
      status: 'blocked'
    }, (err, user) => {
      if (err) {
        console.error(err);
      }
    })
  )
  getUserList(req, res);
});

router.post('/unblock', function (req, res, next) {
  req.body.forEach(id =>
    User.update({
      _id: id
    }, {
      status: 'active'
    }, (err, user) => {
      if (err) {
        console.error(err);
      }
    })
  );
  getUserList(req, res);
});

router.post('/delete', function (req, res, next) {
  req.body.forEach(id => {
    User.findByIdAndRemove(id, req.body, function (err, post) {
      if (err) return console.error(err);
    });
  });
  getUserList(req, res);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('auth/login');
  }
}

module.exports = router;