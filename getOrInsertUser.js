const mysql = require('./utils/mysqlUtils');
const getUserId = require('./getUserId');

const getOrInsertUser = (email, name) => {
//check if user exists? 
// yes : return userID
let userId = getUserId(email);
if(userId){
    return userId;
}
//no
//insert new user
userId = createUser(name , email);

return userId; 
}

module.exports = getOrInsertUser;