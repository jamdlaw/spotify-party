const mysql = require('./utils/mysqlUtils');
const getUserId = require('./getUserId');
const createUser = require('./createUser');

const getOrInsertUser = async (email, name) => {
//check if user exists? 
// yes : return userID
let userId = await getUserId(email);
if(userId){
    return userId;
}
//no
//insert new user
userId = await createUser(name , email);

return userId; 
}

module.exports = getOrInsertUser;