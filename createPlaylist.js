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
  
  await addTracksToPlaylist(playlistId)
};

const addTracksToPlaylist = async (playlistId) => {
  /* new code BUT look at the old code first
  the new way is better */
  /*
  sql = "SELECT track_id FROM recommended_tracks limit 5;";
  tracks = await mysql.query(sql);
  
  tracks.forEach(track => {
     console.log(track.track_id);
  });
  */
  // this is the old code that needs to be converted 
  try {
      const uris = recommendations.map((track) => track.uri);
      const { data } = await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
              uris: uris,
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );

      console.log("Tracks added to playlist:", data);
  } catch (error) {
      console.error("Error adding tracks to playlist:", error);
  }
}


module.exports = createPlaylist;