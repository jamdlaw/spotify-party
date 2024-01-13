const addTracksToPlaylist = require('./addTracksToPlaylist');
const mysql = require('./utils/mysqlUtils');


const createPlaylist = (accessToken) => {
    
  userID = '31afxyqa3va5diljlxixvp53iwqi'; 
  const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
  let playlistId = '';

  //return new Spotify Playlist Id
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body:JSON.stringify({
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false 
    })
  })
  .then(res => res.json())
  .then(data => {return data.id }) 
  .catch(error => console.log(error));

};



module.exports = createPlaylist;