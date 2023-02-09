const mysql = require('mysql2/promise');
const config = require('../config');

//query function is used for every database request, be aware to close the connection after usage
async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);

  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });
  
  const [results, ] = await connection.execute(sql, params);

  connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });

  return results;
}

module.exports = {
  query
}