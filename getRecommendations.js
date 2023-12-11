const mysql = require('./utils/mysqlUtils');

const getRecommendations = (accessToken) => {  
  const sqlQuery = 'SELECT distinct track_id FROM tracks limit 5'; 
  const seedTracks = [];
  mysql.query(sqlQuery).then(data =>{
    data.forEach(track => {
      seedTracks.push(track.track_id);
    });
      query = {seed_tracks: seedTracks};
      const params = new URLSearchParams(query);
      const queryString = params.toString();
      console.log(queryString);
  });
      
  
};
module.exports = getRecommendations;

