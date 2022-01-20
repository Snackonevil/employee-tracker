const inquirer = require("inquirer");
const cTable = require("console.table");
const dbQuery = require("./queries");

let deptList = async () => await dbQuery.Departments.getAllAsArray();
let empList = async () => await dbQuery.Employees.getAllAsArray();

empList();

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
        name: "name",
        message: "Enter NAME of role:",
        // when add
    },
    {
        type: "input",
        name: "salary",
        message: answers => `${answers.name}\'s SALARY:`,
        // when add
    },
    {
        type: "input",
        name: "department",
        message: answers => `${answers.name}\'s DEPARTMENT:`,
        // when add
    },
    // ---------------------------------------------------------
    // --------------------- IF UPDATE -------------------------
    // insert prompts

    // ---------------------------------------------------------
    // ---------------------- IF DELETE ------------------------
    // insert prompts
];

const employeePrompt = [
    {
        type: "list",
        name: "status",
        message: "What would you like to do?",
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
        message: "Enter Employee's First Name",
        when: ({ status }) => status == "Add Employee",
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter Employee's Last Name",
        when: ({ status }) => status == "Add Employee",
    },
    {
        type: "input",
        name: "role",
        message: answer =>
            `What is ${answer.firstName} ${answer.lastName}\'s role?:'}`,
        when: ({ status }) => status == "Add Employee",
    },
    {
        type: "input",
        name: "manager",
        message: answer =>
            `Who is ${answer.firstName} ${answer.lastName}\'s manager? Enter their ID (if none, leave blank):`,
        when: ({ status }) => status == "Add Employee",
    },
    // ---------------------------------------------------------
    // --------------------- IF UPDATE -------------------------
    // insert prompts

    // ---------------------------------------------------------
    // ---------------------- IF DELETE ------------------------
    // insert prompts
];

module.exports = { main, deptPrompt, rolePrompt, employeePrompt };
