const mysql = require('./utils/mysqlUtils');

const createParty = (userid, partyname) => {
  const sqlQuery = 'INSERT INTO party ( party_name, user_id ) VALUES(?,?)';
    let results = '';
    try{
      mysql.query(sqlQuery,[partyname , userid] );
    } catch(error){
      console.log(error);
    }
}

module.exports = createParty;