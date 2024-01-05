const mysql = require('./utils/mysqlUtils');

    const getUserId = async (email) =>{
        const sql = "SELECT id FROM USERS WHERE email = ? ";
        let results = '';
        try{  
            results = await mysql.query(sql, email);
        } catch(error){
            console.log(error);
        }
        
        return results[0];
    }

module.exports = getUserId;