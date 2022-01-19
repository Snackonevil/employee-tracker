const mysql = require("mysql2");

// SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee, role;

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlServer",
    database: "mycompany",
});

const db = connect.promise();

const queryDepartments = {
    showAll: async () => {
        let [departments] = await db.query(`SELECT * FROM departments`);
        console.table(departments);
    },
    add: async deptName => {
        await db.query(`INSERT INTO departments
        VALUES (id, ${deptName})`);
    },
};

const queryRoles = {
    showAll: async () => {
        let [roles] = await db.query(`SELECT * FROM roles`);
        console.table(roles);
    },
};

const queryEmployees = {
    showAll: async () => {
        let [employees] = await db.query(`SELECT * FROM employees`);
        console.table(employees);
    },
};

module.exports = {
    db,
    queryDepartments,
    queryRoles,
    queryEmployees,
};
