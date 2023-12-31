const getSeedTracks = require('./getSeedTracks.js');

const getRecommendations = async (accessToken) => {  
  const queryString = await getSeedTracks()
  //const url = 'https://api.spotify.com/v1/recommendations?seed_tracks=0c6xIDDpzE81m2q797ordA,0dFKeiAqnUlyezHPdflj8n'
  const url = 'https://api.spotify.com/v1/recommendations?' + queryString;
  
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(res => res.json())
  .then(data => data.tracks)
  .catch(error => console.log(error));
  
};
  

module.exports = getRecommendations;

