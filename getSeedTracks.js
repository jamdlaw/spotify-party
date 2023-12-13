const mysql = require('./utils/mysqlUtils');

const  getSeedTracks = () =>{ 
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT distinct track_id FROM tracks limit 5'; 
        const seedTracks = [];
        let queryString = '';
        let recommendations = '';
        mysql.query(sqlQuery).then(data =>{
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

module.exports = getSeedTracks;