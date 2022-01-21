// Application entry file

// Init console.table per documentation
const cTable = require("console.table");
const { mainMenu, deptMenu, roleMenu, employeeMenu } = require("./utils/menus");

// Import query objects
const dbQuery = require("./utils/queries");

// State of app
let process = true;

// Entry function
async function init() {
    while (process === true) {
        let { choice } = await mainMenu();
        switch (choice) {
            case "View Departments":
                await dbQuery.Departments.showTable();
                await deptMenu();
                break;
            case "View Roles":
                await dbQuery.Roles.showTable();
                await roleMenu();
                break;
            case "View Employees":
                await dbQuery.Employees.showTable();
                await employeeMenu();
                break;
            case "Exit":
                dbQuery.db.end();
                process = false;
                return;
        }
    }
}

// Initialize app
init();
