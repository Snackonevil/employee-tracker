// This files has the functions that handle the menus

// Bring in inquirer module
const inquirer = require("inquirer");

// Import prompt content for inquirer
const {
    main,
    deptPrompt,
    rolePrompt,
    employeePrompt,
    viewPrompt,
} = require("./menuContent");

// Import objects for query methods
const Departments = require("../lib/Departments");
const Roles = require("../lib/Roles");
const Employees = require("../lib/Employees");

// Menu Prompts
async function mainMenu() {
    let choice = await inquirer.prompt(main);
    return choice;
}

// Function handling Departments menu
async function deptMenu() {
    let data = await inquirer.prompt(deptPrompt);
    switch (data.status) {
        case "Add Department":
            await Departments.add(data.dept);
            break;
        case "Update Department":
            // add await handle update
            break;
        case "Delete Department":
            if (data.confirm == true) {
                await Departments.delete(data.dept);
            } else {
                return;
            }
            break;
        case "BACK":
            break;
    }
}

// Function handling Roles menu
async function roleMenu() {
    let data = await inquirer.prompt(rolePrompt);
    switch (data.status) {
        case "Add Role":
            let [department] = await Departments.getIdByName(data.department);
            await Roles.add(data.role, data.salary, department.id);
            break;
        case "Update Role":
            // need method
            break;
        case "Delete Role":
            if (data.confirm == true) {
                await Roles.delete(data.role);
                break;
            } else {
                return;
            }
        case "BACK":
            break;
    }
}

// Manipulate employee data strings to get specific information for query
function parseEmployeeData(data) {
    const employee = {
        id: data.replaceAll(",", "").split(" ")[1].trim(),
        firstName: data.replaceAll(",", "").split(" ")[2].trim(),
        lastName: data.replaceAll(",", "").split(" ")[3].trim(),
    };
    return employee;
}

// Gets Id from "ID, Name" strings
function parseOutId(data) {
    const id = data.replaceAll(",", "").split(" ")[1];
    return id;
}

// Function handling Employees menu
async function employeeMenu() {
    const {
        status,
        firstName,
        lastName,
        role,
        manager,
        confirm,
        newRole,
        employeeData,
    } = await inquirer.prompt(employeePrompt);
    switch (status) {
        case "Add Employee":
            let managerId = parseOutId(manager);
            let roleId = parseOutId(role);
            await Employees.add(firstName, lastName, roleId, managerId);
            break;
        case "Update Employee":
            // Parse employee info to further specify query
            let updateEmployee = parseEmployeeData(employeeData);
            await Employees.update(
                updateEmployee.id,
                updateEmployee.firstName,
                updateEmployee.lastName,
                newRole
            );
            break;
        case "Delete Employee":
            confirm == true;
            let deleteEmployee = parseEmployeeData(employeeData);
            await Employees.delete(
                deleteEmployee.id,
                deleteEmployee.firstName,
                deleteEmployee.lastName
            );
            break;
        case "BACK":
            break;
    }
}

async function viewMenu() {
    const { view } = await inquirer.prompt(viewPrompt);
    return view;
}

module.exports = { mainMenu, deptMenu, roleMenu, employeeMenu, viewMenu };
