//

// Initialize MySql node module
const mysql = require("mysql2");

// Connect to MySql database with credentials
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlServer",
    database: "mycompany",
    multipleStatements: true,
});

// Makes queries into promises for asynch operation
const db = connect.promise();

module.exports = db;
