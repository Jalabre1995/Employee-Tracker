var mysql = require('mysql');
var inquirer = require('inquirer');

////create the connection information for the mysql database////
var connection = mysql.createConnection({
    host: "localhost",
    //Port///
    port: 3306,
    ///Username////
    user: "root",

    ///Your Password///
    password: "Josh1995@10",
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
        message: "Would you like to do ?",
        choices: ["ADD", "REMOVE", "View All employees by Department", "View all employees by Manager", "View all employees", "Update Employees role", "Update Employees Manager"]
    })
    .then(function(answer) {
        //base on the answer, add or rmove employee///
        if (answer.addORRemove === "ADD") {
            addEmployee();
        }
        else if (answer.addORRemove === "REMOVE") {
            removeEmployee();
        }else if(answer.addORRemove === "View All employees by Department"){
            viewEmployeesDepart();
        }else if( answer.addORRemove === "View all employees by Manager"){
            viewManager();
        }else if(answer.addORRemove === "View all employees"){
            viewEmployees();
        }else if (answer.addORRemove === "Update Employees role"){
            updateEmpRole();
        }else if(answer.addORRemove === "Update Employees Manager"){
            updateManager();
        }else connection.end();
            
        
        
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
            choices: ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"]
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
                console.table(answer);
                //re-prompt the user for if they want to add or remove///
                start();
            }
        )
    })
}

//Remove an employee////
function removeEmployee() {
/// query the database for all the employees being removed
connection.query("SELECT * FROM employee_list", function(err, results) {
    if (err) throw err;
    ///now that you have the employees, prompt the user to remove
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
    ]).then(function(answer){
        /////Remove the employee////
        connection.query(
            "INSERT INTO employee_list SET ?",
            {
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role 
            },
            function(err) {
                if (err) throw err;
                console.log("Your employee was successfully removed!");
                console.table(answer);
                start();
            }
        )
        
    })
})
}

///function to see all departments/////
function viewEmployeesDepart(){
    connection.query("SELECT * FROM department_list", function (err, answer) {
        console.log("\n Departments Retreived from the Database \n");
        console.table(answer);
    });
    start();
};

///function view all managers///
function viewManager() {
    connection.query("SELECT * FROM employee_list", function (err, answer) {
        console.log("\n Departments Retreived from the Database \n");
        console.table(answer);
    })
};

////To view employees/////
function viewEmployees() {
    console.log("retrieving employees from database");
    var emp = 
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, deaprtment.name AS department, role.salary FROM employee "
    connection.query (emp, function(err, answer) {
        console.log("\n Employees retrieved from the Database \n");
        console.table(answer);
    });
    start();
}
///function to update/////
function updateEmpRole() {
    let allemployes = [];
    connection.query("SELECT * FROM employee_list", function(err, answer) {
        console.log(answer);
        
    })
}