const mysql = require('./utils/mysqlUtils');
const request = require('request');

// Function to insert data into the tables
const insertTrackData = async (sampleData) =>   {
    if (typeof sampleData === 'undefined' || sampleData === null || sampleData === '') {
      return;
    }
  
    try{
      for (const item of sampleData) {  
        // Insert artists
        const artist = item.track.artists;
        for (const a of artist){
            mysql.query('INSERT IGNORE INTO Artists (artist_id, artist_name, uri) VALUES (?, ?, ?)', [
            a.id, a.name, a.uri
          ]);
        }
        
        // Insert albums
        const album = item.track.album;
        mysql.query('INSERT IGNORE INTO Albums (album_id, album_name, album_type, total_tracks, release_date) VALUES (?, ?, ?, ?, ?)', [
          album.id,
          album.name,
          album.album_type,
          album.total_tracks,
          album.release_date
        ]);
  
        // Insert tracks
        mysql.query('INSERT INTO Tracks (track_id, album_id, track_name, album_name, album_type, total_tracks, release_date, track_number, duration_ms, explicit, popularity, preview_url, is_local, played_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
          item.track.id,
          album.id,
          item.track.name,
          album.name,
          album.album_type,
          album.total_tracks,
          album.release_date,
          item.track.track_number,
          item.track.duration_ms,
          item.track.explicit,
          item.track.popularity,
          item.track.preview_url,
          item.track.is_local,
          item.played_at
        ]);
  
      } //end of sampleData loop
      console.log('Data inserted successfully.');
    } catch(error){
      console.log(error);
    }
  
  };
  
  const getRecentlyPlayed = async (accessToken) => {
    const url = 'https://api.spotify.com/v1/me/player/recently-played?limit=10';
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const getSeedTracks = require('./getSeedTracks.js');

  const getRecommendations = async (accessToken) => {  
    const queryString = await getSeedTracks()
    const url = 'https://api.spotify.com/v1/recommendations?' + queryString;
    
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
    
  };
  
const addTracksToPlaylist = async (access_token, playlistId) => {
     
    sql = "SELECT uris FROM recommended_tracks limit 5;";
    tracks = await mysql.query(sql);
    uris = tracks.map( (track) => track.uris); 
    
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


  const createUser = async (email, name) =>{
    const sql = "INSERT INTO users (email, name) VALUES(?, ?)";
    let results = '';
    try{  
        results = await mysql.query(sql, [email, name]);
    } catch(error){
        console.log(error);
    }

    return results;
}


const createParty = async (userId, partyName) => {
    const sqlQuery = 'INSERT INTO party ( user_id, party_name  ) VALUES(?,?)';
    let results = '';
    try{
      results = await mysql.query(sqlQuery,[userId, partyName]);
    }catch(error){
      console.log(error);
    }
    
    return results.insertId;
  }

  const getProfileData = async (access_token) => {
    return new Promise((resolve, reject) => {
      let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
      };
  
      // use the access token to access the Spotify Web API
      let userId = ''; 
      request.get(options, async function(error, response, body) {
          //console.log(body.email , body.display_name);
          resolve(body);      
      });
    });
  }
  

  const getPartyList = async () =>{
    return new Promise(async (resolve, reject) => {
        const sql = "SELECT id, party_name FROM party;";
        let results = [];
        try{  
            results = await mysql.query(sql);
            resolve(results);
        } catch(error){
            resolve(results);
        }
    });
}


const joinGuestToParty = async (userId, partyId, is_host = 0) => {
    const sql = 'INSERT INTO party_guests(user_id, party_id,is_host) VALUES (?,?,?);';
    try{  
        results = await mysql.query(sql, [userId, partyId, is_host]);
    } catch(error){
        console.log(error);
    }
    
    return {'guestId': results.insertId};
      
}


const createPlaylist = (accessToken, playListName) => {
    
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
        "name": playListName,
        "description": "Play list created by spotify party",
        "public": false 
    })
  })
  .then(res => res.json())
  .then(data => {return data.id }) 
  .catch(error => console.log(error));
}

const getOrInsertUser = async (email, name) => {
  //check if user exists? 
  // yes : return userID
  let userId = await getUserId(email);
  if(userId){
      return userId;
  }
  //no
  //insert new user
  userId = await createUser(email, name );
  
  return {"id" : userId.insertId}; 
}
  

// Export all functions at once for easy import
module.exports = {
    insertTrackData,
    getRecentlyPlayed,
    getRecommendations,
    addTracksToPlaylist,
    createUser,
    createParty,
    getProfileData,
    getPartyList,
    joinGuestToParty,
    createPlaylist,
  };
  
   