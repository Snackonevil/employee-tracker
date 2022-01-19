const inquirer = require("inquirer");
const {
    main,
    deptPrompt,
    rolePrompt,
    employeePrompt,
} = require("./menuContent");

async function handleAdd(dept) {
    console.log(dept);
}

async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}
async function deptMenu() {
    let data = await inquirer.prompt(deptPrompt);
    switch (data.choice) {
        case "Add Department":
            await handleAdd(data.addDept);
            break;
        case "Update Department":
            await handleUpdate();
            break;
        case "Delete Department":
            await handleDelete();
            break;
    }
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
