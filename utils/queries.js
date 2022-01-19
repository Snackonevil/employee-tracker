const mysql = require("mysql2");

// SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee, role;

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlServer",
    database: "mycompany",
});

const db = connect.promise();

const Departments = {
    showAll: async () => {
        let [departments] = await db.query(`SELECT * FROM departments`);
        console.table(departments);
    },
    add: async deptName => {
        await db.query(`INSERT INTO departments
        VALUES (id, '${deptName}')`);
        console.log(`Department ${deptName} ADDED`);
    },
    delete: async deptName => {
        await db.query(`DELETE FROM departments WHERE name='${deptName}'`);
        console.log(`Department ${deptName} DELETED`);
    },
};

const Roles = {
    showAll: async () => {
        let [roles] = await db.query(`SELECT * FROM roles`);
        console.table(roles);
    },
};

const Employees = {
    showAll: async () => {
        let [employees] = await db.query(`SELECT * FROM employees`);
        console.table(employees);
    },
};

module.exports = {
    db,
    Departments,
    Roles,
    Employees,
};
