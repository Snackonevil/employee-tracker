USE mycompany;

INSERT INTO departments (id, name)
VALUES (1, 'department');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'worker', 20.00, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Smith', 1, null);