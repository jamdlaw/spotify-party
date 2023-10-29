// authController.js
const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

router.get('/login', (req, res) => {
  const authURL = authService.generateAuthURL();
  res.redirect(authURL);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokens = await authService.exchangeCodeForTokens(code);
    // Save tokens to user session or database
    res.send('Authentication successful!');
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;
