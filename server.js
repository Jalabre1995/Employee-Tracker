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
            name: "first",
            type: "input",
            message: "First Name?"
        }, 
        {
            name: "last",
            type:"input",
            message:"Last Name?"
        },
        {
            name:"role",
            type: "input",
            message: "What is their role?",
            choices: ["Sales Lead", "Slaes Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"]
        }


    ]).then(function(answer) { 
        ///insert the new employees/////
        connection.query(
            "INSERT INTO employee_list SET ?",
            {
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role
                
            },
            function(err){
                if(err) throw err;
                console.log("Your employee has been added!");
                //re-prompt the user for if they want to add or remove///
                start();
            }
        )
    })
}