// This files has the functions that handle the menus

// Bring in inquirer module
const inquirer = require("inquirer");

// Import prompt content for inquirer
const {
    main,
    deptPrompt,
    rolePrompt,
    employeePrompt,
} = require("./menuContent");

// Import query methods for objects
const dbQuery = require("./queries");

// Colors for funsies
const Red = "\u001b[31;1m";
const Green = "\u001b[32;1m";
const Yellow = "\u001b[33;1m";

// Menu Prompts
async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}

// Function handling Departments menu
async function deptMenu() {
    let data = await inquirer.prompt(deptPrompt);
    switch (data.status) {
        case "Add Department":
            await dbQuery.Departments.add(data.dept);
            break;
        case "Update Department":
            // add await handle update
            console.log(Yellow, `\n---${data.dept} department UPDATED ---\n`);
            break;
        case "Delete Department":
            if (data.confirm == true) {
                await dbQuery.Departments.delete(data.dept);
            } else {
                return;
            }
            break;
        case "BACK":
            break;
    }
}

// Function handling Roles menu
async function roleMenu() {
    let data = await inquirer.prompt(rolePrompt);
    switch (data.status) {
        case "Add Role":
            let [department] = await dbQuery.Departments.getIdByName(
                data.department
            );
            await dbQuery.Roles.add(data.role, data.salary, department.id);
            break;
        case "Update Role":
            // need method
            break;
        case "Delete Role":
            if (data.confirm == true) {
                // need method
            } else {
                return;
            }
            break;
        case "BACK":
            break;
    }
}

// Function handling Employees menu
async function employeeMenu() {
    let {
        status,
        firstName,
        lastName,
        role,
        manager,
        confirm,
        newRole,
        employeeData,
    } = await inquirer.prompt(employeePrompt);
    switch (status) {
        case "Add Employee":
            let managerId = manager.replaceAll(",", "").split(" ")[1];
            let roleId = role.replaceAll(",", "").split(" ")[1];
            await dbQuery.Employees.add(firstName, lastName, roleId, managerId);
            break;
        case "Update Employee":
            // Parse employee info to further specify query
            let employeeId = employeeData
                .replaceAll(",", "")
                .split(" ")[1]
                .trim();
            let employeeFirstName = employeeData
                .replaceAll(",", "")
                .split(" ")[2];
            let employeeLastName = employeeData
                .replaceAll(",", "")
                .split(" ")[3];
            await dbQuery.Employees.update(
                employeeId,
                employeeFirstName,
                employeeLastName,
                newRole
            );

            break;
        case "Delete Employee":
            confirm == true;
            // ? // delete method
            // : "";
            break;
        case "BACK":
            break;
    }
}

module.exports = { mainMenu, deptMenu, roleMenu, employeeMenu };
