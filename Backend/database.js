var mysql = require('mysql2');
var conn = mysql.createConnection({
  host: "remotemysql.com", // Replace with your host name
  user: 'xjvfbOqclm',      // Replace with your database username
  password: 'FnGanGybEh',      // Replace with your database password
  database: 'xjvfbOqclm' // // Replace with your database Name
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;