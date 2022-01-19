const mysql = require("mysql2");
const cTable = require("console.table");
const {
    mainMenu,
    deptMenu,
    roleMenu,
    employeeMenu,
} = require("./utils/prompts");

const {
    db,
    queryDepartments,
    queryRoles,
    queryEmployees,
} = require("./utils/queries");

async function init() {
    let { choice } = await mainMenu();
    console.log(choice);
    switch (choice) {
        case "Departments":
            queryDepartments.showAll();
            await deptMenu;
            break;
        case "Roles":
            queryRoles.showAll();
            await roleMenu();
            break;
        case "Employees":
            queryEmployees.showAll();
            await employeeMenu();
            break;
        case "Exit":
            db.end();
            return;
    }
}

init();
