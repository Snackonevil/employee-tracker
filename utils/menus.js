const inquirer = require("inquirer");
const {
    main,
    deptPrompt,
    rolePrompt,
    employeePrompt,
} = require("./menuContent");

const dbQuery = require("./queries");

const Red = "\u001b[31;1m";
const Green = "\u001b[32;1m";
const Yellow = "\u001b[33;1m";

// Menu Prompts
async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}

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
            // await handle update
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
                    `\n---${data.role} DELETED to ROLES table---\n`
                );
            } else {
                return;
            }
            break;
        case "BACK":
            break;
    }
}

async function employeeMenu() {
    let data = await inquirer.prompt(employeePrompt);
    switch (data.status) {
        case "Add Employee":
            let managerId = data.manager.split(" ")[1];
            console.log(data.firstName, data.lastName, data.role, managerId);
            break;
        case "Update Employee":
            // await update method
            break;
        case "Delete Employee":
            data.confirm == true;
            // ? // delete method
            // : "";
            break;
        case "BACK":
            break;
    }
}

module.exports = { mainMenu, deptMenu, roleMenu, employeeMenu };
