const express = require('express');
const authController = require('../controllers/authController');
const spotifyController = require('../controllers/spotifyController');

const router = express.Router();

router.get('/login', authController.login);
router.get('/callback', authController.callback);

router.get('/listen-history', spotifyController.getListenHistory);
router.get('/create-playlist', spotifyController.createPlaylist);
router.get('/add-songs', spotifyController.addSongsToPlaylist);

module.exports = router;
