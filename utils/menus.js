const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const {
    main,
    deptPrompt,
    rolePrompt,
    employeePrompt,
} = require("./menuContent");

const dbQuery = require("./queries");

async function handleAddDept(dept) {
    await dbQuery.Departments.add(dept);
}

async function handleDeleteDept(dept) {
    await dbQuery.Departments.delete(dept);
}

async function handleAddEmployee(first, last) {
    await console.log(first, last);
}

async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}
async function deptMenu() {
    let data = await inquirer.prompt(deptPrompt);
    switch (data.status) {
        case "Add Department":
            await handleAddDept(data.addDept);
            break;
        case "Update Department":
            await handleUpdateDept();
            break;
        case "Delete Department":
            data.confirm == true ? await handleDeleteDept(data.deleteDept) : "";
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
            await handleAddEmployee(data.firstName, data.lastName);
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
