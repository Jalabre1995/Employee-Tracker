DROP DATABASE IF EXISTS my_employee;
CREATE DATABASE my_employee;

USE my_employee;

CREATE TABLE department_list(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) DEFAULT NULL
);

CREATE TABLE role_list(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) DEFAULT NULL, 
salary DECIMAL(9,0),
department_id INTEGER (11) NOT NULL,
FOREIGN KEY (department_id)
REFERENCES department_list(id)
);

CREATE TABLE employees(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) DEFAULT NULL,
last_name VARCHAR(30) DEFAULT NULL,
role_id INTEGER(30) NOT NULL,
manager_id INTEGER(11),
FOREIGN KEY (role_id)
REFERENCES role_list(id),
FOREIGN KEY (manager_id)
REFERENCES employees(id)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Josh1995@10'