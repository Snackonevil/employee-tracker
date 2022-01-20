const mysql = require("mysql2");
const cTable = require("console.table");
const { mainMenu, deptMenu, roleMenu, employeeMenu } = require("./utils/menus");

const dbQuery = require("./utils/queries");

let process = true;

async function init() {
    while (process === true) {
        let { choice } = await mainMenu();
        switch (choice) {
            case "View Departments":
                await dbQuery.Departments.showAll();
                await deptMenu();
                break;
            case "View Roles":
                await dbQuery.Roles.showAll();
                await roleMenu();
                break;
            case "View Employees":
                await dbQuery.Employees.showAll();
                await employeeMenu();
                break;
            case "Exit":
                dbQuery.db.end();
                process = false;
                return;
        }
    }
}

init();
