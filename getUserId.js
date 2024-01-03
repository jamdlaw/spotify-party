const mysql = require('./utils/mysqlUtils');

    const getUserId = async (email) =>{
        const sql = "SELECT id FROM USERS WHERE email = ? ";
        
        let results = '';
        try{  
            results = await mysql.query(sql, email);
        } catch(error){
            console.log(error);
        }
        console.log(results);
        return results.id;
    }

module.exports = getUserId;