const mysql = require("mysql2");
const cTable = require("console.table");
const { mainMenu } = require("./utils/prompts");

async function connectDb() {
    const connect = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "MySqlServer",
        database: "employees",
    });
    const db = connect.promise();
    let choice = await mainMenu();

    const [employees] = await db.query("SELECT * FROM employee");
    const [departments] = await db.query("SELECT * FROM department");
    const [roles] = await db.query("SELECT * FROM role");
}

async function init() {
    await connectDb();
}

init();
