const mysql = require('./utils/mysqlUtils');
const request = require('request');


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

const getSeedTracks = (userId) =>{ 
  return new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT distinct track_id FROM tracks where user_id = ? limit 5'; 
      const seedTracks = [];
      let queryString = '';
      let recommendations = '';
      mysql.query(sqlQuery, userId).then(data =>{
          data.forEach(track => {
          seedTracks.push(track.track_id);
          });
          query = {seed_tracks: seedTracks};
          const params = new URLSearchParams(query);
          queryString = params.toString();
          return resolve(queryString);
        });
      });
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
  
   