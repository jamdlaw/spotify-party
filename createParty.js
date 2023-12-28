const mysql = require('./utils/mysqlUtils');

const createParty = (userid, partyname) => {
  const sqlQuery = 'INSERT INTO party ( party_name, user_id ) VALUES(?,?)';
    let results = '';
    try{
      mysql.query(sqlQuery,[partyname , userid], function(err, result, fields){
        return result.insertId;
      });
    } catch(error){
      console.log(error);
    }
}

module.exports = createParty;