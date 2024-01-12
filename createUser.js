const mysql = require('./utils/mysqlUtils');

    const createUser = async (email, name) =>{
        const sql = "INSERT INTO users (email, name) VALUES(?, ?)";
        let results = '';
        try{  
            results = await mysql.query(sql, [email, name]);
        } catch(error){
            console.log(error);
        }

        return results;
    }

module.exports = createUser;