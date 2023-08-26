const express = require('express');
const authController = require('../controllers/authController');
const spotifyController = require('../controllers/spotifyController');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

// Authentication routes
router.get('/login', authController.login);
router.get('/callback', authController.callback);

// Spotify-related routes
router.get('/listen-history', spotifyController.getListenHistory);
router.get('/create-playlist', spotifyController.createPlaylist);
router.get('/add-songs', spotifyController.addSongsToPlaylist);

// Playlist-related routes
router.post('/create-playlist', playlistController.createPlaylist);
router.post('/add-songs', playlistController.addSongsToPlaylist);

module.exports = router;
