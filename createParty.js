const mysql = require('./utils/mysqlUtils');

const createParty = async (userId, partyName) => {
  const sqlQuery = 'INSERT INTO party ( party_name, user_id ) VALUES(?,?)';
  let results = '';
  try{
    results = await mysql.query(sqlQuery,[partyName , userId]);
  }catch(error){
    console.log(error);
  }
  
  return results.insertId;
}

module.exports = createParty;