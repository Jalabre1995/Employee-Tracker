var mysqul = require('mysql');
var inquirer = require('inquirer');

////create the connection information for the mysql database////
var connection = mysql.createConnection({
    host: "localhost",
    //Port///
    port: 3306,
    ///Username////
    user: "root",

    ///Your Password///
    password: "",
    database: "my_employee"
});

//connect to the mysql server and sql database///
connection.connect(function(err){
    if (err) throw err;
    ///run the start function after the connection is made to prompt the user to start///
    start();
});


///Prompts what action they should take/////
function start(){
    inquirer
    .prompt({
        name: "addORRemove",
        type: "list",
        message: "Would you like to [ADD] an employee or [REMOVE] an employee ?",
        choices: ["ADD", "REMOVE"]
    })
    .then(function(answer) {
        //base on the answer, add or rmove employee///
        if (answer.addORRemove === "ADD") {
            addEmployee();
        }
        else if (answer.addORRemove === "REMOVE") {
            removeEmployee();
        }else {
            connection.end();
        }
    });
}

//function for addEmployee////
function addEmployee(){
    inquirer
    .prompt([
        {
            name: "add",
            type: "input",
            message: "First Name?"
        }, 
        {
            name: "add",
            type:"input",
            message:"Last Name?"
        },
        {
            name:"add",
            type: "input",
            message: "What is their role?",
            choices: ["Sales Lead", "Slaes Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Tam Lead"]
        }


    ]).then(function(answer) { 
        ///insert the new employees/////
        connection.query(
            "INSERT INTO employee_list SET ?",
            {
                
            }
        )
    })
}