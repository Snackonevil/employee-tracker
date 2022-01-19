const inquirer = require("inquirer");
const {
    main,
    deptPrompt,
    rolePrompt,
    employeePrompt,
} = require("./menuContent");

async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}
async function deptMenu() {
    let choice = await inquirer.prompt(deptPrompt);
    return choice;
}
async function roleMenu() {
    let choice = await inquirer.prompt(rolePrompt);
    return choice;
}
async function employeeMenu() {
    let choice = await inquirer.prompt(employeePrompt);
    return choice;
}

module.exports = { mainMenu, deptMenu, roleMenu, employeeMenu };
