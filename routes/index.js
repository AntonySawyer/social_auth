const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  req.isAuthenticated() ? res.redirect('users') : res.redirect('auth/login');
});

module.exports = router;