const mysql = require('./utils/mysqlUtils');

const createParty = (userid, partyname) => {
  const sqlQuery = 'INSERT INTO party ( party_name, user_id ) VALUES(?,?)';
    let results = '';
    try{
      mysql.query(sqlQuery,[partyname , userid]).then((results) => {
        //console.log(results.insertId);
        return results.insertId;
      }
        
      );
    } catch(error){
      console.log(error);
    }
}

module.exports = createParty;