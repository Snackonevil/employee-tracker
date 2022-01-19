const inquirer = require("inquirer");

const main = [
    {
        type: "list",
        pageSize: 12,
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
            "Update an Employee Role",
            new inquirer.Separator(),
            "Exit",
            new inquirer.Separator(),
        ],
    },
];

const addDept = [
    {
        type: "input",
        name: "dept",
        message: "Enter name of department:",
    },
];

const addRole = [
    {
        type: "input",
        name: "role.name",
        message: "Enter NAME of role:",
    },
    {
        type: "input",
        name: "role.salary",
        message: answers => `${answers.role.name}\'s SALARY:`,
    },
    {
        type: "input",
        name: "role.department",
        message: answers => `${answers.role.department}\'s DEPARTMENT:`,
    },
];

const addEmployee = [
    {
        type: "input",
        name: "employee.firstName",
        message: "Enter Employee's First Name",
    },
    {
        type: "input",
        name: "employee.lastName",
        message: "Enter Employee's Last Name",
    },
    {
        type: "input",
        name: "employee.role",
        message: answer =>
            `What is ${answer.employee.firstName} ${answer.employee.lastName}\'s role?:'}`,
    },
    {
        type: "input",
        name: "employee.manager",
        message: answer =>
            `Who is ${answer.employee.firstName} ${answer.employee.lastName}\'s manager? Enter their ID (if none, leave blank):`,
    },
];

module.exports = { main, addDept, addRole, addEmployee };
