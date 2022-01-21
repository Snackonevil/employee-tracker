const mysql = require("mysql2");

const Black = "\u001b[30m";
const Red = "\u001b[31;1m";
const Green = "\u001b[32;1m";
const Yellow = "\u001b[33;1m";
const Blue = "\u001b[34m";
const Magenta = "\u001b[35m";
const Cyan = "\u001b[36m";
const White = "\u001b[37m";
const Reset = "\u001b[0m";

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlServer",
    database: "mycompany",
});

const db = connect.promise();

const Departments = {
    showTable: async () => {
        // let [departments] = await db.query({
        //     sql: "SELECT departments.title FROM departments",
        //     rowAsArray: true,
        // });
        let [departments] = await db.query(
            "SELECT departments.id AS 'ID', departments.title AS 'Name' FROM departments"
        );
        console.table(Blue, departments);
        return departments;
    },

    getAllAsArray: async () => {
        let [data] = await db.query(
            "SELECT departments.title FROM departments"
        );
        let list = data.map(item => item.title);
        return list;
    },

    add: async deptName => {
        await db.query(`INSERT INTO departments
        VALUES (id, '${deptName}')`);
        console.log(Green, `Department ${deptName} ADDED`);
    },
    delete: async deptName => {
        await db.query(`DELETE FROM departments WHERE name='${deptName}'`);
        console.log(`Department ${deptName} DELETED`);
    },
};

const Roles = {
    showTable: async () => {
        let [roles] = await db.query(`SELECT roles.id AS 'ID',
        roles.title AS 'Title',
        departments.title AS 'Department',
        roles.salary AS 'Salary'
        FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id;`);
        console.table(roles);
    },

    add: async (title, salary, department) => {
        // will department be taken in by ID or name?
    },

    delete: async () => {
        // needs to take in parameter from list
    },
};

const Employees = {
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

    // EMPLOYEE ARRAY (First name, Last name, Title ordered by ID)
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

    showManager: async () => {
        let [employees] = await db.query(`SELECT a.id AS 'ID',
        CONCAT (a.first_name, + ' ', a.last_name) AS 'Employee',
        CONCAT(b.first_name, + ' ', b.last_name) as 'Manager'
        FROM employees a, employees b
        WHERE a.manager_id = b.id
        ORDER BY b.last_name;`);
        console.table(employees);
    },

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

    add: async (firstName, lastName, role, manager) => {
        // will role and manager be taken in by ID or name?
    },

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
