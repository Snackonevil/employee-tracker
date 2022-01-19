const inquirer = require("inquirer");
const { main, addDept, addRole, addEmployee } = require("./menuContent");

async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}
async function deptMenu() {
    let choice = await inquirer.prompt(addDept);
    return choice;
}
async function roleMenu() {
    let choice = await inquirer.prompt(addRole);
    return choice;
}
async function employeeMenu() {
    let choice = await inquirer.prompt(addEmployee);
    return choice;
}

module.exports = { mainMenu, deptMenu, roleMenu, employeeMenu };
