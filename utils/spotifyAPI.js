const axios = require('axios');

const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1'
});

spotifyAPI.interceptors.request.use(
  (config) => {
    // Add authorization header with access token
    const accessToken = 'your_access_token_here'; // You'll need to pass the actual access token
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = spotifyAPI;
