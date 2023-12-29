const mysql = require('./utils/mysqlUtils');

const createParty = async (userid, partyname) => {
  const sqlQuery = 'INSERT INTO party ( party_name, user_id ) VALUES(?,?)';
  let results = '';
  try{
    results = await mysql.query(sqlQuery,[partyname , userid]);
    //console.log('create party ' + results.insertId); 
  }catch(error){
    console.log(error);
  }
  
  return results.insertId;
}

module.exports = createParty;