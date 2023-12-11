const mysql = require('./utils/mysqlUtils');

const sqlQuery = 'SELECT distinct track_id FROM tracks limit 5'; 
let tracks = {} 
/*
const results = mysql.query(sqlQuery)
results.then((data) =>{
    tracks = {...data};
  console.log(tracks);
});
*/

const url = 'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA';

return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer BQDRDdUo_WpKRamtFGhJOnkqgK2WqtoZsiYGm212RJnn8_BHqj-yHbJluuH5kFnfx2zI3SUCxA08PRKDlqnKNMQZ9T5YX4wZOOb2MnflNFPVhnLnVAdvBgTE3ArzYhuC7XIDuVdDm_omrQmtiqd3qsVrdl37c9o0BafvkN1zkUytd9iVmuIa8_xvisK8FtR2zmYGSucq4PO-Su0C8G2nYwdA',
    },
    
  })
    .then(res => res.json())
    .then(data => data.items)
    .catch(error => console.log(error));



