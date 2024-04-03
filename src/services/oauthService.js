const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const { oauthApi } = require('../api/squareClient');
const axios = require('axios');
// Set up Square OAuth2Strategy
const setupOAuth = () => {
  // *** SECURITY: Validate environment variables ***
  if (!process.env.SQUARE_CLIENT_ID || !process.env.SQUARE_CLIENT_SECRET) {
    throw new Error('Missing Square API credentials. Set SQUARE_CLIENT_ID and SQUARE_CLIENT_SECRET environment variables.');
  }
 
  passport.use('square', new OAuth2Strategy({
      authorizationURL: 'https://connect.squareup.com/oauth2/authorize',
      tokenURL: 'https://connect.squareup.com/oauth2/token',
      clientID: process.env.SQUARE_CLIENT_ID,
      clientSecret: process.env.SQUARE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || 'http://localhost:3000/auth/square/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      // Here you SHOULD:
      // 1. Find or create a user in your database associated with the profile
      // 2. Store the accessToken and potentially refreshToken securely linked to the user
      
      // DO NOT simply do this for production:
      let user = { accessToken: accessToken };  
      return cb(null, user);
    }
  ));
 
  // Configure session management (assuming you're using Express sessions)
  passport.serializeUser((user, done) => {
    done(null, user.accessToken); // Ideally, serialize the user ID
  });
 
  passport.deserializeUser((accessToken, done) => {
    // Look up the user by accessToken in your database
    // ...
    done(null, user);
  });
};
 
const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('https://connect.squareup.com/oauth2/token', {
      client_id: process.env.SQUARE_CLIENT_ID,
      client_secret: process.env.SQUARE_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to exchange code for token');
  }
};


module.exports = { setupOAuth, exchangeCodeForToken };