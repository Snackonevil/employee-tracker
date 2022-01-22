// Application entry file

// Init console.table per documentation
const cTable = require("console.table");
const { mainMenu, deptMenu, roleMenu, employeeMenu } = require("./utils/menus");

// Import query objects
const dbQuery = require("./utils/queries");

// State of app
let process = true;
const Yellow = "\u001b[33;1m";
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
                console.log(Yellow, "----- Goodbye ------\u001b[0m");
                process = false;
                return;
        }
    }
}

// Initialize app
console.log(
    Yellow,
    `
████████╗░█████╗░██╗░░██╗██╗███╗░░██╗░██████╗░
╚══██╔══╝██╔══██╗██║░██╔╝██║████╗░██║██╔════╝░
░░░██║░░░███████║█████═╝░██║██╔██╗██║██║░░██╗░
░░░██║░░░██╔══██║██╔═██╗░██║██║╚████║██║░░╚██╗
░░░██║░░░██║░░██║██║░╚██╗██║██║░╚███║╚██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝░╚═════╝░`
);
console.log(`
░█████╗░░█████╗░██████╗░███████╗  ░█████╗░███████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝  ██╔══██╗██╔════╝
██║░░╚═╝███████║██████╔╝█████╗░░  ██║░░██║█████╗░░
██║░░██╗██╔══██║██╔══██╗██╔══╝░░  ██║░░██║██╔══╝░░
╚█████╔╝██║░░██║██║░░██║███████╗  ╚█████╔╝██║░░░░░
░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝  ░╚════╝░╚═╝░░░░░`);
console.log(`
██████╗░██╗░░░██╗░██████╗██╗███╗░░██╗███████╗░██████╗░██████╗
██╔══██╗██║░░░██║██╔════╝██║████╗░██║██╔════╝██╔════╝██╔════╝
██████╦╝██║░░░██║╚█████╗░██║██╔██╗██║█████╗░░╚█████╗░╚█████╗░
██╔══██╗██║░░░██║░╚═══██╗██║██║╚████║██╔══╝░░░╚═══██╗░╚═══██╗
██████╦╝╚██████╔╝██████╔╝██║██║░╚███║███████╗██████╔╝██████╔╝
╚═════╝░░╚═════╝░╚═════╝░╚═╝╚═╝░░╚══╝╚══════╝╚═════╝░╚═════╝░ \n`);
console.log(Yellow, "Employee Tracker by Kevin Lacson - 2022\u001b[0m");

// ASCII art from https://fsymbols.com/text-art/

init();
