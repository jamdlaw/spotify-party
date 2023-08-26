const axios = require('axios');
const spotifyAPI = require('../utils/spotifyAPI'); // Implement this utility

const spotifyService = {
  getListenHistory: async (accessToken) => {
    const response = await spotifyAPI.get('/me/player/recently-played', accessToken);
    return response.data.items;
  },

  getRecommendedSongs: async (accessToken, artistIds) => {
    const response = await spotifyAPI.get('/recommendations', accessToken, {
      params: {
        seed_artists: artistIds.join(','),
        limit: 10 // You can adjust the number of recommended songs
      }
    });
    return response.data.tracks;
  }
};

module.exports = spotifyService;
