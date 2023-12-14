const mysql = require('./utils/mysqlUtils');

const addTracksToPlaylist = async (playlistId) => {
     
    sql = "SELECT track_id FROM recommended_tracks limit 5;";
    tracks = await mysql.query(sql);
    /*
    tracks.forEach(track => {
       console.log(track.track_id);
    });
    */
    uris = tracks.map( (track) => track.track_id); 
    console.log(uris);
    /*
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
    */
  }
  
module.exports = addTracksToPlaylist;