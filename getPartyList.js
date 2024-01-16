const mysql = require('./utils/mysqlUtils');

    const getPartyList = async () =>{
        const sql = "SELECT id, party_name FROM party;";
        let results = '';
        try{  
            results = await mysql.query(sql);
        } catch(error){
            console.log(error);
        }
        
        return results;
    }

module.exports = getPartyList;