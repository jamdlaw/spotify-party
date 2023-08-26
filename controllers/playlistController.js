const express = require('express');
const playlistService = require('../services/playlistService');

const router = express.Router();

router.post('/create-playlist', async (req, res) => {
  const { userId, playlistName } = req.body;

  try {
    const playlistId = await playlistService.createPlaylist(userId, playlistName);
    res.status(201).json({ playlistId });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Error creating playlist' });
  }
});

router.post('/add-songs', async (req, res) => {
  const { playlistId, songIds } = req.body;

  try {
    await playlistService.addSongsToPlaylist(playlistId, songIds);
    res.status(200).json({ message: 'Songs added to playlist successfully' });
  } catch (error) {
    console.error('Error adding songs to playlist:', error);
    res.status(500).json({ error: 'Error adding songs to playlist' });
  }
});

module.exports = router;
