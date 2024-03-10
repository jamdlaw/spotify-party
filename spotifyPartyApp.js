const mysql = require('./utils/mysqlUtils');
const request = require('request');

//insert song data from listen history
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

// get guests / hosts recenlty played from spotify  
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
//use spotify endpoint  
const getRecommendations = async (accessToken, userId) => {  
    const queryString = await getSeedTracks(userId)
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
//after playlist is created add the songs  
const addTracksToPlaylist = async (access_token, playlistId) => {
     
    sql = "SELECT uris FROM recommended_tracks limit 5;";
    tracks = await mysql.query(sql);
    uris = tracks.map( (track) => track.uris); 
    
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ "uris": uris })
      });

      const data = await response.json();
      
      return data; 
  } catch (error) {
      console.log(error);
  }
}
//create new spotify party app user
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
//insert new row in party table
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
//get profile data from spotify
const getProfileData = async (access_token) => {
  const url = 'https://api.spotify.com/v1/me';
  const headers = { 'Authorization': 'Bearer ' + access_token };

  try {
    const response = await fetch(url, { headers: headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    // Handle or throw the error appropriately
    throw error;
  }
};
//get a list of parties people can join    
const getPartyList = async () =>{
    const sql = "SELECT id, party_name FROM party;";
    try {
        const results = await mysql.query(sql);
        return results; 
    } catch (error) {
        console.error("Error fetching party list:", error);
        return []; // Return an empty array or handle the error as appropriate
    } 
}
//add user id to party table
const joinGuestToParty = async (userId, partyId, is_host = 0) => {
    const sql = 'INSERT INTO party_guests(user_id, party_id,is_host) VALUES (?,?,?);';
    try{  
        results = await mysql.query(sql, [userId, partyId, is_host]);
    } catch(error){
        console.log(error);
    }
    
    return {'guestId': results.insertId};
      
}
//create spotify playlist and return new ID
const createPlaylist = async (accessToken, playlistName, spotifyUserID) => {
   
  const url = `https://api.spotify.com/v1/users/${spotifyUserID}/playlists`;
  let playlistId = '';
  try{
    //return new Spotify Playlist Id
    const response =  await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body:JSON.stringify({
          "name": playlistName,
          "description": "Play list created by spotify party",
          "public": false 
      })
    })
    
    if(!response.ok){
      console.log("Network error");
    } 

    const data = response.json();

    return data;
  } catch(error){
    console.log(error);
  }
}
//if user exists return id else insert new user
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
//lookup user pay email return id  
const getUserId = async (email) =>{
  const sql = "SELECT id FROM USERS WHERE email = ? ";
  let results = '';
  try{  
      results = await mysql.query(sql, email);
  } catch(error){
      console.log(error);
  }
  
  return results[0];
}

//busines logic to get tracks for playlist
const getSeedTracks = async (userId) => {
  const sqlQuery = 'SELECT distinct track_id FROM tracks where user_id = ? limit 5';

  try {
      const data = await mysql.query(sqlQuery, userId); 
      const seedTracks = data.map(track => track.track_id); 
      const query = { seed_tracks: seedTracks };
      const params = new URLSearchParams(query);
      return params.toString(); 
  } catch (error) {
      console.error("Error fetching seed tracks:", error);
      throw error; 
  }
};

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
    getOrInsertUser,
    getUserId,
    getSeedTracks,
  };
  
   