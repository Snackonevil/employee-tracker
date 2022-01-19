const inquirer = require("inquirer");
const { db } = require("./queries");

const test = [1, 2, 3];

const deptList = async () => {
    let [list] = await db.query({
        sql: "SELECT departments.name FROM departments",
        rowAsArray: true,
    });
    return list;
};

const main = [
    {
        type: "list",
        pageSize: 12,
        name: "choice",
        message: "Select an option",
        choices: [
            new inquirer.Separator(),
            "Departments",
            "Roles",
            "Employees",
            new inquirer.Separator(),
            "Exit",
            new inquirer.Separator(),
        ],
    },
];

const deptPrompt = [
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?:",
        choices: ["Add Department", "Update Department", "Delete Department"],
    },
    {
        type: "input",
        name: "dept",
        message: "Enter name of department:",
        when: ({ choice }) => choice == "Add Department",
    },
    {
        type: "list",
        name: "dept",
        message: "Which department would you like to UPDATE?:",
        when: ({ choice }) => choice == "Update Department",
        choices: deptList,
    },
    {
        type: "list",
        name: "dept",
        message: "Which department would you like to DELETE?:",
        when: ({ choice }) => choice == "Delete Department",
        choice: deptList,
    },
];

const addDept = [{}];

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

module.exports = { main, deptPrompt };
