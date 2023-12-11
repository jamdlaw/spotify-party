const mysql = require('./utils/mysqlUtils');

const sqlQuery = 'SELECT distinct track_id FROM tracks limit 5'; 
let tracks = {} 
const results = mysql.query(sqlQuery)
results.then((data) =>{
    tracks = {...data};
  console.log(tracks);
});

/*
const url = 'https://api.spotify.com/v1/recommendations';

return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body{
        seed_tracks: JSON.stringify(tracks);
    }   
  })
    .then(res => res.json())
    .then(data => data.items)
    .catch(error => console.log(error));
*/


