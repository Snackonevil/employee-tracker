const mysql = require("mysql2");
const cTable = require("console.table");
const { mainMenu } = require("./utils/prompts");
const Employee = require("./lib/Employee");

async function connectDb() {
    const connect = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "MySqlServer",
        database: "mycompany",
    });
    const db = connect.promise();
    let choice = await mainMenu();
    if (choice) {
        const test = new Employee("kevin", "lacson", "2", "3");
        test.insert();
    }
    const [employees] = await db.query("SELECT * FROM employee");
    const [departments] = await db.query("SELECT * FROM department");
    const [roles] = await db.query("SELECT * FROM role");
}

async function init() {
    await connectDb();
}

init();
