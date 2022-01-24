// Application entry file

// Init console.table per documentation
const cTable = require("console.table");
const { mainMenu, deptMenu, roleMenu, employeeMenu } = require("./utils/menus");

// Import MySQL connection in order to end it on Exit
const db = require("./db/connection");

// Import objects for query methods
const Departments = require("./lib/Departments");
const Roles = require("./lib/Roles");
const Employees = require("./lib/Employees");

// State of app
let process = true;

//Color for funsies
const Yellow = "\u001b[33;1m";

// Entry function
async function init() {
    while (process === true) {
        let { choice } = await mainMenu();
        switch (choice) {
            case "View Departments":
                await Departments.showTable();
                await deptMenu();
                break;
            case "View Roles":
                await Roles.showTable();
                await roleMenu();
                break;
            case "View All Employees":
                await Employees.showTable();
                await employeeMenu();
                break;
            case "View Employees by Department":
                // await Employees.showManager();
                await employeeMenu();
                break;
            case "View Employees by Manager":
                // await Employees.showManager();
                await employeeMenu();
                break;
            case "Exit":
                db.end();
                console.log(Yellow, "------ Goodbye ------\u001b[0m");
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
