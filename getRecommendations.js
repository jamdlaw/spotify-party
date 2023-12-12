const mysql = require('./utils/mysqlUtils');

const getRecommendations = (accessToken) => {  
  const sqlQuery = 'SELECT distinct track_id FROM tracks limit 5'; 
  const seedTracks = [];
  let queryString = '';
  let recommendations = '';
  mysql.query(sqlQuery).then(data =>{
    data.forEach(track => {
      seedTracks.push(track.track_id);
    });
      query = {seed_tracks: seedTracks};
      const params = new URLSearchParams(query);
      const queryString = params.toString();
      console.log(queryString);
      const url = 'https://api.spotify.com/v1/recommendations?' + queryString;
    //const url = 'https://api.spotify.com/v1/recommendations?seed_tracks=0c6xIDDpzE81m2q797ordA,0dFKeiAqnUlyezHPdflj8n'
    
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
    });
      
};
  

module.exports = getRecommendations;

