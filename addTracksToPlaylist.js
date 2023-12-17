const mysql = require('./utils/mysqlUtils');

const addTracksToPlaylist = async (access_token, playlistId) => {
     
    sql = "SELECT uris FROM recommended_tracks limit 5;";
    tracks = await mysql.query(sql);
    uris = tracks.map( (track) => track.track_id); 
    //console.log(uris);
    url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
        body:JSON.stringify({"uris": uris})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
  };
  
module.exports = addTracksToPlaylist;