// ====================================================================
// DEPARTMENTS
// Methods for DEPARTMENTS table queries
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

// Departments object
const Departments = {
    // Console logs departments list (id, title)
    showTable: async () => {
        let [departments] = await db.query(
            "SELECT departments.id AS 'ID', departments.title AS 'Name' FROM departments"
        );
        console.table(Blue, departments);
    },

    // Returns department titles as array
    getAllAsArray: async () => {
        let [data] = await db.query(
            "SELECT departments.title FROM departments"
        );
        let deptArray = data.map(item => item.title);
        return deptArray;
    },

    getIdByName: async department => {
        let [departmentId] = await db.query(
            `SELECT departments.id FROM departments WHERE departments.title = '${department}'`
        );
        return departmentId;
    },

    // INSERT new department INTO departments table
    add: async deptName => {
        await db.query(`INSERT INTO departments
        VALUES (id, '${deptName}')`);
        createLine(Green);
        console.log(
            Green,
            `${deptName.toUpperCase()} department ADDED to DEPARTMENTS\n`
        );
        createLine(Green);
    },

    // DELETE department by name
    delete: async deptName => {
        await db.query(`DELETE FROM departments WHERE title='${deptName}'`);
        createLine(Red);
        console.log(Red, `${deptName} department DELETED \n`);
        createLine(Red);
    },
};

module.exports = Departments;
