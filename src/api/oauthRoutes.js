const express = require('express');
const passport = require('passport');
const router = express.Router();
 
// Redirect to OAuth provider for authentication
router.get('/auth/square', passport.authenticate('square'));
 
// The callback after the user has authenticated with the OAuth provider
router.get('/auth/square/callback',
  passport.authenticate('square', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
 
module.exports = router;
