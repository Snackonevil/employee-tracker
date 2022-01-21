// This file has database queries organized as method objects

// Initialize MySql node module
const mysql = require("mysql2");

// Colors for funsies
const Red = "\u001b[31;1m";
const Green = "\u001b[32;1m";
const Yellow = "\u001b[33;1m";
const Blue = "\u001b[34m";

// Connect to MySql database with credentials
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlServer",
    database: "mycompany",
});

// Makes queries into promises for asynch operation
const db = connect.promise();

// Methods for DEPARTMENTS TABLE queries
const Departments = {
    // Returns all departments and logs to console (id, title)
    showTable: async () => {
        let [departments] = await db.query(
            "SELECT departments.id AS 'ID', departments.title AS 'Name' FROM departments"
        );
        console.table(Blue, departments);
        return departments;
    },

    // Returns department titles as array
    getAllAsArray: async () => {
        let [data] = await db.query(
            "SELECT departments.title FROM departments"
        );
        let list = data.map(item => item.title);
        return list;
    },

    // INSERT new department INTO departments table
    add: async deptName => {
        await db.query(`INSERT INTO departments
        VALUES (id, '${deptName}')`);
        console.log(Green, `Department ${deptName} ADDED`);
    },

    // DELETE department by name
    delete: async deptName => {
        await db.query(`DELETE FROM departments WHERE name='${deptName}'`);
        console.log(`Department ${deptName} DELETED`);
    },
};

// Methods for ROLES TABLE queries
const Roles = {
    // LOGS roles (id, title, department, salary)
    showTable: async () => {
        let [roles] = await db.query(`SELECT roles.id AS 'ID',
        roles.title AS 'Title',
        departments.title AS 'Department',
        roles.salary AS 'Salary'
        FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id;`);
        console.table(roles);
    },

    getAllAsArray: async () => {
        let [roles] = await db.query(
            `SELECT roles.id, roles.title FROM roles;`
        );
        let roleList = roles.map(role => `ID: ${role.id}, ${role.title}`);
        return roleList;
    },

    // INSERT new role INTO roles table
    add: async (title, salary, department) => {
        // will department be taken in by ID or name?
    },

    // DELETE role from roles table by name
    delete: async () => {
        // needs to take in parameter from list
    },
};

// Methods for EMPLOYEES TABLE queries
const Employees = {
    // EMPLOYEE query (id, name, title, salary, department, manager)
    showTable: async () => {
        let [employees] = await db.query(`SELECT a.id AS 'ID', 
        CONCAT(a.first_name, + ' ', + a.last_name) AS 'Name', 
        roles.title AS 'Job Title',
        roles.salary AS 'Salary', 
        departments.title AS 'Department',
        CONCAT(b.first_name, + ' ', b.last_name) AS 'Manager'
        FROM employees a
        LEFT JOIN roles ON a.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees b ON a.manager_id = b.id;`);
        console.table(Blue, employees);
    },

    // EMPLOYEE query returned as ARRAY for prompt lists(First name, Last name, Title ordered by ID)
    getAllAsArray: async () => {
        let [employees] = await db.query(`SELECT employees.id AS 'ID',
        CONCAT(employees.first_name, + ' ', + employees.last_name) AS 'Employee',
        roles.title as "Title"
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        ORDER BY employees.id;`);
        let array = employees.map(
            item => `ID: ${item.ID}, ${item.Employee}, ${item.Title}`
        );
        return array;
    },

    // EMPLOYEE query showing employees' names and their manager name
    showManager: async () => {
        let [employees] = await db.query(`SELECT a.id AS 'ID',
        CONCAT (a.first_name, + ' ', a.last_name) AS 'Employee',
        CONCAT(b.first_name, + ' ', b.last_name) as 'Manager'
        FROM employees a, employees b
        WHERE a.manager_id = b.id
        ORDER BY b.last_name;`);
        console.table(employees);
    },

    // EMPLOYEE query by department
    // Returns all employees in specified department
    showByDepartment: async department => {
        let [employees] =
            await db.query(`SELECT CONCAT(employees.first_name, + ' ', + employees.last_name) AS 'Employee',
        roles.title as "Title"
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        WHERE departments.title = '${department}';`);
        console.log(`${department} department`);
        console.table(employees);
    },

    // INSERT new employee INTO employees table
    add: async (firstName, lastName, roleId, managerId) => {
        await db.query(`INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
        VALUES (id, '${firstName}', '${lastName}', ${roleId}, ${managerId});`);
    },

    // DELETE employee by specified name
    delete: async name => {
        await db.query(`DELETE FROM employees WHERE name='${name}'`);
        console.log(Red, `${name}\'s employee records were DELETED`);
    },
};

module.exports = {
    db,
    Departments,
    Roles,
    Employees,
};
