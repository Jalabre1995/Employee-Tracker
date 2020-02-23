# Employee-Tracker

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

# Purpose

The Purpose of this project is to create a app that allows Managers to keep track of how many employees they have in each department in the company. This app is really useful when you are putting new employees into the company's system. 

# Guidelines for the Project
Build a command-line application that at a minimum allows the user to:


Add departments, roles, employees


View departments, roles, employees


Update employee roles


Bonus points if you're able to:


Update employee managers


View employees by manager


Delete departments, roles, and employees


View the total utilized budget of a department -- ie the combined salaries of all employees in that department
# In the file
Look in my application and download my schema file, seed file, json package, and server.js file into a folder. Open up the command line and npm i mysql, express, and inquirer. 

# Challenges
The challenges that I came across when writing this command line was getting the remove function to work. I used DELETE FROM(database) and still was recieivng a syntax error. And another issue I was having was recivieng information from two tables at the smae time. I tried using a call back function to recive it. But that didn't work. There is still work that needs to be done for this app.
