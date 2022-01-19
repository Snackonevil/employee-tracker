const mysql = require("mysql2");

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlServer",
    database: "employees",
});
const db = connect.promise();

class Employee {
    constructor(first, last, role, managerId) {
        this.first = first;
        this.last = last;
        this.role = role;
        this.managerId = managerId;
    }
    insert() {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${this.first}', '${this.last}', '${this.role}', '${this.managerId}')`);
    }
}

module.exports = Employee;
