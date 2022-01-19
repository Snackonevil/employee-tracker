const inquirer = require("inquirer");

const mainMenu = [
    {
        type: "list",
        name: "choice",
        message: "Select an option",
        choices: [
            "View All Departments",
            "Add Department",
            new inquirer.Separator(),
            "View All Roles",
            "Add a Role",
            new inquirer.Separator(),
            "View All Employees",
            "Add an Employee",
            "Update an Employee",
            new inquirer.Separator(),
            "Exit",
        ],
    },
];

module.exports = { mainMenu };
