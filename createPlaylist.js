const addTracksToPlaylist = require('./addTracksToPlaylist');
const mysql = require('./utils/mysqlUtils');


const createPlaylist = async (accessToken) => {
    
   userID = '31afxyqa3va5diljlxixvp53iwqi';
   //example url: https://api.spotify.com/v1/users/{user_id}/playlists
   const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
  let playlistId = '';

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
  .then(data => playlistId = data.id)
  .catch(error => console.log(error));

  
  await addTracksToPlaylist(playlistId)
};



module.exports = createPlaylist;