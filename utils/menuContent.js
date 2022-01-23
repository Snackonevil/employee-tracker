// This file has the content for the inquirer prompts

// Bringing inquirer module
const inquirer = require("inquirer");
const cTable = require("console.table");

// Import objects for query methods
const Departments = require("../lib/Departments");
const Roles = require("../lib/Roles");
const Employees = require("../lib/Employees");

// Methods to pull lists as arrays
const deptList = async () => await Departments.getAllAsArray();
const empList = async () => await Employees.getAllAsArray();
const roleList = async () => await Roles.getAllAsArray();
const roleListNameOnly = async () => {
    let roles = await roleList();
    let roleNames = roles.map(role => role.split(",")[1].trim());
    return roleNames;
};

const main = [
    {
        type: "list",
        pageSize: 12,
        name: "choice",
        message: "Select an option:",
        choices: [
            new inquirer.Separator(),
            "View Departments",
            "View Roles",
            "View Employees",
            new inquirer.Separator(),
            "Exit",
            new inquirer.Separator(),
        ],
    },
];

const deptPrompt = [
    {
        type: "list",
        name: "status",
        message: "What would you like to do?:",
        choices: [
            new inquirer.Separator(),
            "Add Department",
            "Update Department",
            "Delete Department",
            new inquirer.Separator(),
            "BACK",
            new inquirer.Separator(),
        ],
    },
    {
        type: "input",
        name: "dept",
        message: "Enter name of department:",
        when: ({ status }) => status == "Add Department",
    },
    // ---------------------------------------------------------
    // --------------------- IF UPDATE -------------------------
    {
        type: "list",
        name: "dept",
        message: "Which department would you like to UPDATE?:",
        when: ({ status }) => status == "Update Department",
        choices: deptList,
    },
    // ---------------------------------------------------------
    // ---------------------- IF DELETE ------------------------
    {
        type: "list",
        name: "dept",
        message: "Which department would you like to DELETE?:",
        when: ({ status }) => status == "Delete Department",
        choices: deptList,
    },
    {
        type: "confirm",
        name: "confirm",
        message: ({ deleteDept }) =>
            `Are you sure you would like to DELETE ${deleteDept} from Departments?`,
        when: ({ status }) => status == "Delete Department",
    },
];

const rolePrompt = [
    {
        type: "list",
        name: "status",
        message: "What would you like to do?:",
        choices: [
            new inquirer.Separator(),
            "Add Role",
            "Update Role",
            "Delete Role",
            new inquirer.Separator(),
            "BACK",
            new inquirer.Separator(),
        ],
    },
    {
        type: "input",
        name: "role",
        message: "Enter NAME of new role:",
        when: ({ status }) => status == "Add Role",
    },
    {
        type: "list",
        name: "department",
        message: answers =>
            `Which DEPARTMENT is the ${answers.role.toUpperCase()} role?:`,
        choices: deptList,
        when: ({ status }) => status == "Add Role",
    },
    {
        type: "input",
        name: "salary",
        message: answers =>
            `What is the SALARY for a(n) ${answers.role.toUpperCase()}?:`,
        when: ({ status }) => status == "Add Role",
    },

    // ---------------------------------------------------------
    // --------------------- IF UPDATE -------------------------
    // insert prompts

    // ---------------------------------------------------------
    // ---------------------- IF DELETE ------------------------
    {
        type: "list",
        name: "role",
        message: "While ROLE would you like to delete?",
        choices: roleListNameOnly,
        when: ({ status }) => status == "Delete Role",
    },
    {
        type: "confirm",
        name: "confirm",
        message: answers =>
            `Are you sure you would like to DELETE ${answers.role} from the database?`,
        when: ({ status }) => status == "Delete Role",
    },
];

const employeePrompt = [
    {
        type: "list",
        name: "status",
        message: `What would you like to do?`,
        choices: [
            new inquirer.Separator(),
            "Add Employee",
            "Update Employee",
            "Delete Employee",
            new inquirer.Separator(),
            "BACK",
            new inquirer.Separator(),
        ],
    },
    {
        type: "input",
        name: "firstName",
        message: "Enter Employee's First Name:",
        when: ({ status }) => status == "Add Employee",
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter Employee's Last Name:",
        when: ({ status }) => status == "Add Employee",
    },
    {
        type: "list",
        name: "role",
        message: answer =>
            `What is ${answer.firstName} ${answer.lastName}'s role?:`,
        choices: roleList,
        when: ({ status }) => status == "Add Employee",
    },
    {
        type: "list",
        name: "manager",
        message: answer =>
            `Who is ${answer.firstName} ${answer.lastName}'s manager?:`,
        choices: empList,
        when: ({ status }) => status == "Add Employee",
    },
    {
        type: "confirm",
        name: "confirm",
        message: answer =>
            `Add ${answer.firstName.toUpperCase()} ${answer.lastName.toUpperCase()} as a(n) ${answer.role
                .split(",")[1]
                .toUpperCase()
                .trim()} with ${answer.manager
                .split(",")[1]
                .toUpperCase()
                .trim()} as their MANAGER?`,
        when: ({ status }) => status == "Add Employee",
    },
    // ---------------------------------------------------------
    // --------------------- IF UPDATE -------------------------
    {
        type: "list",
        name: "employeeData",
        message: "Which employee would you like to UPDATE?",
        choices: empList,
        when: ({ status }) => status == "Update Employee",
    },
    {
        type: "list",
        name: "newRole",
        message: ({ employeeData }) =>
            `What is ${employeeData.split(",")[1].trim()}'s NEW role?`,
        choices: roleListNameOnly,
        when: ({ status }) => status == "Update Employee",
    },

    // ---------------------------------------------------------
    // ---------------------- IF DELETE ------------------------
    {
        type: "list",
        name: "employeeData",
        message: "Which employee would you like to DELETE?",
        choices: empList,
        when: ({ status }) => status == "Delete Employee",
    },
    {
        type: "confirm",
        name: "confirm",
        message: answers =>
            `Are you sure you would like to DELETE ${answers.employeeData
                .split(",")[1]
                .trim()
                .toUpperCase()}, ${answers.employeeData
                .split(",")[2]
                .trim()
                .toUpperCase()} from the database?`,
        when: ({ status }) => status == "Delete Employee",
    },
];

module.exports = { main, deptPrompt, rolePrompt, employeePrompt };
