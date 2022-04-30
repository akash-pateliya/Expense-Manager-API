const mysql = require('mysql2/promise');
const dbConfig = require("../config/db.config");

let connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;