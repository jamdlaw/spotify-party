const express = require('express');
const spotifyService = require('../services/spotifyService');
const playlistService = require('../services/playlistService');

const router = express.Router();

router.get('/listen-history', async (req, res) => {
  try {
    const listenHistory = await spotifyService.getListenHistory(); // Implement this function
    // Process listenHistory and extract relevant information
    res.send('Listening history fetched successfully');
  } catch (error) {
    console.error('Error fetching listen history:', error);
    res.status(500).send('Error fetching listen history');
  }
});

router.get('/create-playlist', async (req, res) => {
  try {
    const playlistId = await playlistService.createPlaylist('Recommended Playlist'); // Implement this function
    // Continue with adding songs to the playlist
    res.send(`Playlist created with ID: ${playlistId}`);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).send('Error creating playlist');
  }
});

router.get('/add-songs', async (req, res) => {
  try {
    const recommendedSongs = await spotifyService.getRecommendedSongs(); // Implement this function
    const playlistId = 'your_playlist_id_here'; // Replace with the actual playlist ID
    await playlistService.addSongsToPlaylist(playlistId, recommendedSongs); // Implement this function
    res.send('Songs added to playlist successfully');
  } catch (error) {
    console.error('Error adding songs to playlist:', error);
    res.status(500).send('Error adding songs to playlist');
  }
});

module.exports = router;
