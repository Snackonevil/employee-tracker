USE mycompany;

INSERT INTO departments (id, title)
VALUES (1, 'Administration'),
(2, 'Accounts and Finance'), 
(3, 'Sales and Marketing'), 
(4, 'Operations'), 
(5, 'Quality Assurance'), 
(6, 'Development');

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Chief Executive Officer', 60.00, 1),
(2, 'Chief Financial Officer', 60.00, 1),
(3, 'Chief Technology Officer', 60.00, 1),
(4, 'Accountant', 29.00, 2),
(5, 'Sales Manager', 29.00, 3),
(6, 'Marketing Manager', 29.00, 3),
(7, 'Operations Managers', 30.00, 4),
(8, 'Product Manager', 27.00, 4),
(9, 'Tester', 30.00, 5),
(10, 'Tech Lead', 40.00, 6),
(11, 'Software Developer', 38.00, 6),
(12, 'Junior Software Developer', 35.00, 6);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Maxwell', 'Roth', 1, null),
(2, 'Jalen', 'Mendoza', 2, null),
(3, 'Tyler', 'Guzman', 3, null),
(4, 'Madison', 'Carrillo', 4, 2),
(5, 'Annabelle', 'Simmons', 4, 2),
(6, 'Landyn', 'Patterson', 5, 2),
(7, 'Gracie', 'Chandler', 5, 2),
(8, 'Amari', 'Roberson', 6, 2),
(9, 'Greyson', 'Perry', 7, 1),
(10, 'Talia', 'Duarte', 8, 3),
(11, 'Angelina', 'Burton', 9, 10),
(12, 'Delaney', 'Watson', 10, 3),
(13, 'Stephen', 'Golden', 8, 3),
(14, 'Johan', 'Joyce', 9, 13),
(15, 'John', 'Blankenship', 12, 10),
(16, 'Hudson', 'Smith', 12, 10),
(17, 'Alyssa', 'Cuson', 11, 10),
(18, 'Christine', 'Nguyen', 11, 10),
(19, 'Darby', 'Johnson', 11, 10),
(20, 'Kevin', 'Lacson', 11, 10);