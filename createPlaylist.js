const mysql = require('./utils/mysqlUtils');

const createPlaylist = async (accessToken) => {
    
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
    body:JSON.stringify({
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false 
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));

  playlistId = '2e8CxqDjUx5OzYHFl9qjyR';
  await addTracksToPlaylist(playlistId)
};



module.exports = createPlaylist;