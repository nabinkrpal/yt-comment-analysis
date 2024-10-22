const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly']
}));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
