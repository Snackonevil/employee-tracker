const inquirer = require("inquirer");
const {
    main,
    deptPrompt,
    rolePrompt,
    employeePrompt,
} = require("./menuContent");

const dbQuery = require("./queries");

// Menu Prompts
async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}
async function deptMenu() {
    let data = await inquirer.prompt(deptPrompt);
    switch (data.status) {
        case "Add Department":
            await dbQuery.Departments.add(data.addDept);
            break;
        case "Update Department":
            await handleUpdateDept();
            break;
        case "Delete Department":
            data.confirm == true
                ? await dbQuery.Departments.delete(data.deleteDept)
                : "";
            break;
        case "BACK":
            break;
    }
}
async function roleMenu() {
    let choice = await inquirer.prompt(rolePrompt);
    return choice;
}
async function employeeMenu() {
    let data = await inquirer.prompt(employeePrompt);
    switch (data.status) {
        case "Add Employee":
            await console.log(data.firstName, data.lastName);
            break;
        case "Update Employee":
            await handleUpdateEmployee();
            break;
        case "Delete Employee":
            data.confirm == true
                ? await handleDeleteEmployee(data.deleteEmployee)
                : "";
            break;
        case "BACK":
            break;
    }
}

module.exports = { mainMenu, deptMenu, roleMenu, employeeMenu };
