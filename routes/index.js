var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('user', {
      title: 'Users'
    });
    return ;
  }
  res.redirect('auth/login');
});

module.exports = router;