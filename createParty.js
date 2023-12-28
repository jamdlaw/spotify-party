const mysql = require('./utils/mysqlUtils');

const createParty = async (userid, partyname) => {
  const sqlQuery = 'INSERT INTO party ( party_name, user_id ) VALUES(?,?)';
  let results = '';
  results = await mysql.query(sqlQuery,[partyname , userid]);
  console.log('create party ' + results.insertId);
  return results.insertId;
  
}

module.exports = createParty;