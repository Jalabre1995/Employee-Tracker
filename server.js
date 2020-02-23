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
        },
    


    ]).then(function(answer) { 
        ///insert the new employees/////
        connection.query(
            "INSERT INTO employees SET ?",
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
connection.query("SELECT * FROM employees", function(err, results) {
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
                choices: ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"]
        } 
    ]).then(function(answer){
        /////Remove the employee////
        connection.query(
            "DELETE FROM employees WHERE id = ?",
            {
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role 
            },
            function(err) {
                if (err) throw err;
                console.log(res.affectedRows + "Your employee was successfully removed!\n");
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
    connection.query("SELECT * FROM employees", function (err, answer) {
        console.log("\n Departments Retreived from the Database \n");
        console.table(answer);
    })
};

////To view employees/////
function viewEmployees() {
    console.log("retrieving employees from database");
    connection.query ("SELECT * FROM employees", function(err, answer) {
        console.log("\n Employees retrieved from the Database \n");
        console.table(answer);
    });
    start(); 
}
///function to update/////
function updateEmpRole() {
    let allemployes = [];
    connection.query("SELECT * FROM employees", function(err, answer) {
        console.log(answer);
        for (let i = 0; i < answer.length; i ++) {
            let employeeString  = 
            answer[i].id + "" + answer[i].first_name + "" + answer[i].last_name;
            allemployes.push(employeeString);
        }
        //conosle.log(allemp)
        inquirer
        .prompt([
            {
                type: "list",
                name: "updateEmpRole",
                message: "select employee to update role",
                choices: allemployes
            },
            {
                type: "list",
                message: 'select new role',
                choices: ["manager", "Sales Lead", "Sales Person", "Software Engineer", "Lead Engineer", "Accountant", "Accountant Manager","Legal Team Lead"],
                name: "newrole"
            }
        ])
        .then(function(answer){
            console.log('going to update answer');
            const idToUpdate = {};
            idToUpdate.employeeId = parseInt(answer.updateEmpRole.split('')[0]);
            if(answer.newrole === "manager") {
                idToUpdate.role_id = 1;
            }else if(answer.newrole === "Sales Lead") {
                idToUpdate.role_id = 2;

            }else if(answer.newrole === "Sales Person") {
                idToUpdate.role_id = 3;
            }else if(answer.newrole === "Software Engineer") {
                idToUpdate.role_id = 4;
            }else if(answer.newrole === "Lead Software Engineer") {
                idToUpdate.role_id = 5;
            }else if(answer.newrole === "Accountant") {
                idToUpdate.role_id = 6;
            }else if(answer.newrole === "Accountant Manager") {
                idToUpdate.role_id = 7;
            }else if(answer.role_id === "Legal Team Lead") {
                idToUpdate.role_id = 8;
            }
            connection.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [idToUpdate.role_id, idToUpdate.employeeId],
                function(err, data){
                    console.table(answer)
                    start();
                }
            )
        })
    })
}
////update manager function//////


function updateManager() {
    let allemployes = [];
    connection.query("SELECT * FROM employees", function(err, answer) {
        console.log(answer);
        for (let i = 0; i < answer.length; i ++) {
            let employeeString  = 
            answer[i].id + "" + answer[i].first_name + "" + answer[i].last_name;
            allemployes.push(employeeString);
        }
        //conosle.log(allemp)
        inquirer
        .prompt([
            {
                type: "list",
                name: "updateManager",
                message: "Select New Manager.",
                choices: allemployes
            }
           
        ])
        .then(function(answer){
            console.log('going to update answer');
            const idToUpdate = {};
            idToUpdate.employeeId = parseInt(answer.updateEmpRole);
            if(answer.newrole === "manager") {
                idToUpdate.role_id = 1;
            } 
            connection.query(
                "UPDATE employees SET manager_id = ? WHERE id = ?",
                [idToUpdate.role_id, idToUpdate.employeeId],
                function(err, data){
                    console.table(answer)
                    start();
                }
            )
        })
    })

}


