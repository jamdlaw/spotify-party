const mysql = require('mysql');

module.exports = {
    query,
}

// Connect to database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
    pool: { maxConnections: 50, maxIdleTime: 60000 },
    timezone: 'utc',
});

async function query(query) {
    return new Promise(async (resolve, reject) => {
        pool.query(query, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    }); // end promise
}