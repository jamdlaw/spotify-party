const mysql = require('./utils/mysqlUtils');

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
  
module.exports = addTracksToPlaylist;