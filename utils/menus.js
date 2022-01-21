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
            console.log(
                Green,
                `\n---${data.dept} added to DEPARTMENTS table---\n`
            );
            break;
        case "Update Department":
            // add await handle update
            console.log(Yellow, `\n---${data.dept} department UPDATED ---\n`);
            break;
        case "Delete Department":
            if (data.confirm == true) {
                await dbQuery.Departments.delete(data.dept);
                console.log(
                    Red,
                    `\n---${data.dept} deleted from DEPARTMENTS table---\n`
                );
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
            await dbQuery.Roles.add(data.role); // doesn't exist yet
            console.log(Green, `\n---${data.role} ADDED to ROLES table---\n`);
            break;
        case "Update Role":
            // await update role
            console.log(Yellow, `\n---${data.role} UPDATED---\n`);
            break;
        case "Delete Role":
            if (data.confirm == true) {
                await dbQuery.Roles.delete(data.role); // doesn't exist yet
                console.log(
                    Red,
                    `\n---${data.role} DELETED from ROLES table---\n`
                );
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
    let { status, firstName, lastName, role, manager, confirm } =
        await inquirer.prompt(employeePrompt);
    switch (status) {
        case "Add Employee":
            let managerId = manager.replaceAll(",", "").split(" ")[1];
            let roleId = role.replaceAll(",", "").split(" ")[1];
            dbQuery.Employees.add(firstName, lastName, roleId, managerId);
            console.log(Green, `-----------------------------\n`);
            console.log(Green, `${firstName} ${lastName} ADDED to employees\n`);
            console.log(Green, `-----------------------------\n`);
            console.log(role.split(",")[1]);
            break;
        case "Update Employee":
            // await update method
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
