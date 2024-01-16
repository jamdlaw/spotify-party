const mysql = require('./utils/mysqlUtils');

    const getPartyList = async () =>{
        return new Promise(async (resolve, reject) => {
            const sql = "SELECT id, party_name FROM party;";
            let results = [];
            try{  
                results = await mysql.query(sql);
                resolve(results);
            } catch(error){
                resolve(results);
            }
        });
    }

module.exports = getPartyList;