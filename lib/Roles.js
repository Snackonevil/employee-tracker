// ====================================================================
// ROLES
// Methods for ROLES table queries
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

// Roles object
const Roles = {
    // LOGS roles (id, title, department, salary)
    showTable: async () => {
        let [roles] = await db.query(`SELECT roles.id AS 'ID',
            roles.title AS 'Title',
            departments.title AS 'Department',
            roles.salary AS 'Salary'
            FROM roles
            LEFT JOIN departments ON roles.department_id = departments.id;`);
        console.table(Blue, roles);
    },

    getAllAsArray: async () => {
        let [roles] = await db.query(
            `SELECT roles.id, roles.title FROM roles;`
        );
        let roleArr = roles.map(role => `ID: ${role.id}, ${role.title}`);
        return roleArr;
    },

    // INSERT new role INTO roles table
    add: async (title, salary, departmentId) => {
        await db.query(`INSERT INTO roles (id, title, salary, department_id)
            VALUES (id, '${title}', ${salary}, ${departmentId});`);
        createLine(Green);
        console.log(Green, `${title}ADDED to roles\n`);
        createLine(Green);
    },

    // DELETE role from roles table by name
    delete: async () => {
        // needs to take in parameter from list
    },
};

module.exports = Roles;
