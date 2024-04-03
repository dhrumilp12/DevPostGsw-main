const express = require('express');
const passport = require('passport');
const router = express.Router();
const { exchangeCodeForToken } = require('../services/oauthService');
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
 
router.post('/exchange-code', async (req, res) => {
  const { code } = req.body;
  try {
    const tokenData = await exchangeCodeForToken(code);
    res.json(tokenData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
});


module.exports = router;
