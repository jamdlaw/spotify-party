const mysql = require('./utils/mysqlUtils');

const sqlQuery = 'SELECT * FROM tracks'; 

const results = mysql.query(sqlQuery)
results.then((data) =>{
  console.log(data);
});
