const mysql = require("mysql2");
const cTable = require("console.table");

async function connectDb() {
    const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "MySqlServer",
        database: "employees",
    });
    const [employee] = await db.promise().query("SELECT * FROM employee");
    console.table(employee);
}

connectDb();
