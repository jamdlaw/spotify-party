const mysql = require('./utils/mysqlUtils');

const createPlaylist = (accessToken) => {
    sql = "SELECT track_id FROM recommended_tracks limit 5;";
    mysql.query(sql).then(tracks =>{
        console.log(tracks);
    })
};

module.exports = createPlaylist;