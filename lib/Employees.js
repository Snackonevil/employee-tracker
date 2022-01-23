// ====================================================================
// EMPLOYEES
// Methods for EMPLOYEES table queries
// ====================================================================

// Import db connection
const db = require("../db/connection");

// Colors for funsies
const Red = "\u001b[31;1m";
const Green = "\u001b[32;1m";
const Yellow = "\u001b[33;1m";
const Blue = "\u001b[34m";

// For looks
const createLine = color =>
    console.log(
        color,
        `----------------------------------------------------------\u001b[0m \n`
    );

//Employees object
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

    // EMPLOYEE query returned as ARRAY for prompt lists
    // (First name, Last name, Title ordered by ID)
    getAllAsArray: async () => {
        let [employees] = await db.query(`SELECT employees.id AS 'ID',
            CONCAT(employees.first_name, + ' ', + employees.last_name) AS 'Employee',
            roles.title as "Title"
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            ORDER BY employees.id;`);
        let emplArray = employees.map(
            item => `ID: ${item.ID}, ${item.Employee}, ${item.Title}`
        );
        return emplArray;
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
        createLine(Green);
        console.log(Green, `${firstName} ${lastName} ADDED to employees\n`);
        createLine(Green);
    },

    // UPDATE employee role
    update: async (id, firstName, lastName, newRole) => {
        // Get role ID by name
        let [role] = await db.query(`SELECT roles.id FROM roles
            WHERE roles.title = '${newRole}';`);

        // Update query
        await db.query(`UPDATE employees
            SET role_id = ${role[0].id}
            WHERE employees.id = ${id} 
            AND employees.first_name = '${firstName}'
            AND employees.last_name = '${lastName}';`);
        createLine(Yellow);
        console.log(
            Yellow,
            `${firstName.toUpperCase()} ${lastName.toUpperCase()}'s role UPDATED to ${newRole.toUpperCase()}\n`
        );
        createLine(Yellow);
    },

    // DELETE employee by specified name and ID
    delete: async name => {
        // await db.query(`DELETE FROM employees WHERE name='${name}'`);
        // console.log(Red, `${name}'s employee records were DELETED`);
    },
};

module.exports = Employees;
