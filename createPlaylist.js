const mysql = require('./utils/mysqlUtils');

const createPlaylist = (accessToken) => {
    /*
    sql = "SELECT track_id FROM recommended_tracks limit 5;";
    mysql.query(sql).then(tracks =>{
        console.log(tracks);
    })
    */
   userID = '31afxyqa3va5diljlxixvp53iwqi';
   //example url: https://api.spotify.com/v1/users/{user_id}/playlists
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
    
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body:{
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false 
    }
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
  
};

module.exports = createPlaylist;