const mysql = require("mysql2");

// database connection pool is always open till the application shuts down. In case of performing any query we just take connection out of this pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "Ashish@1029",
});

module.exports = pool.promise();
