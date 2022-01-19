const inquirer = require("inquirer");
const { mainMenu } = require("./menus");

async function menu() {
    let choice = await inquirer.prompt(mainMenu);
    return choice;
}

module.exports = { menu };
