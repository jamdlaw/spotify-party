const mysql = require('./utils/mysqlUtils');

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

module.exports = createParty;