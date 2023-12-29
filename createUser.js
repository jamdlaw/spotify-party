const mysql = require('./utils/mysqlUtils');

    const createUser = async (name , email) =>{
        const sql = "INSERT INTO users (name , email) VALUES(?, ?)";
        let results = '';
        try{  
            results = await mysql.query(sql, [name , email]);
        } catch(error){
            console.log(error);
        }

        return results;
    }

module.exports = createUser;