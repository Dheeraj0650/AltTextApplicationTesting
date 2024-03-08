var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


async function connectToDatabase(){
  return new Promise((resolve, reject) => {
    connection.connect(function(err, results) {
      if (err){
        reject(err);
        return;
      }
      console.log('Connected to mysql');
      resolve(results);
    });
  })
}

// DELETE operation
async function deleteData(table_name, id, id_value) {
  const sql =  `DELETE FROM ${table_name} WHERE ${id} = ${id_value}`;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (err, results) => {
      if (err){
        reject(err);
        return;
      }
      
      resolve(results);
    });
  })
}

module.exports = {
  deleteData,
  connectToDatabase
}