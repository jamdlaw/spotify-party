const mysql = require('./utils/mysqlUtils');

const joinGuestToParty = (userId, partyId, is_host = 0) => {
    const sql = 'INSERT INTO party_guests(user_id, party_id,is_host) VALUES (?,?,?);';
    try{  
        results = mysql.query(sql, [userId, partyId, is_host]);
    } catch(error){
        console.log(error);
    }

    return results;
      
}

module.exports = joinGuestToParty;