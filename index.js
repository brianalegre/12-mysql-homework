// Node Application

// Import Modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection')
const viewAllDepartments = require('./scripts/viewAllDepartments')
const viewAllEmployees = require('./scripts/viewAllEmployees')
const viewAllRoles = require('./scripts/viewAllRoles')
const addEmployee = require('./scripts/addEmployee')
const addDepartment = require('./scripts/addDepartment')
const addRole = require('./scripts/addRole')
const updateEmployee = require('./scripts/updateEmployee')



// Update Employee Information
// function updateEmployee() {
//     // List Possible Emplyees
//     db.promise().query(`SELECT * FROM employees`)
//         .then((results) => {
//             const employeeChoices = results[0].map(emp => {
//                 return {
//                     name: `${emp.first_name} ${emp.last_name}`,
//                     value: emp.id
//                 }
//             })
//             // Show current Roles
//             db.promise().query(`SELECT * FROM roles`)
//                 .then((roles) => {
//                     const roleChoices = roles[0].map(role => {
//                         return {
//                             name: role.role_title,
//                             value: role.role_id
//                         }
//                     })

//                     const updateEmployeeQuestions = [
//                         {
//                             name: "id",
//                             message: "Which employee would you like to update?",
//                             type: "list",
//                             choices: employeeChoices
//                         },
//                         {
//                             name: "role_id",
//                             message: "What is the employee's new title?",
//                             type: "list",
//                             choices: roleChoices
//                         }
//                     ]
//                     inquirer.prompt(updateEmployeeQuestions)
//                         .then(results => {
//                             // Update Employee Table
//                             db.promise().query('UPDATE employees SET ? WHERE ?', [results, { id: results.id }])
//                                 .then(() => {
//                                     console.log('Employee Updated');
//                                     userChoice()
//                                 })
//                         })
//                 })
//         })
// }

// Refactor to async / await
async function userChoice() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                `Update an Employee's Role`,
                'Exit'
            ],
            message: 'What would you like to do?',
        }
    ])
    switch (choice) {
        case 'View All Employees':
            console.log(`You picked: `, choice)
            const allEmployees = await viewAllEmployees();
            console.table(allEmployees[0]);
            return userChoice();

        case 'View All Departments':
            console.log(`You picked: `, choice)
            const allDepartments = await viewAllDepartments();
            console.table(allDepartments[0]);
            return userChoice();

        case 'View All Roles':
            console.log(`You picked: `, choice)
            const allRoles = await viewAllRoles();
            console.table(allRoles[0]);
            return userChoice();

        case 'Add an Employee':
            console.log(`You picked: `, choice)
            const employee = await addEmployee();
            console.log(employee);
            return userChoice();

        case 'Add a Department':
            console.log(`You picked: `, choice)
            const department = await addDepartment();
            console.log(department);
            return userChoice();

        case 'Add a Role':
            console.log(`You picked: `, choice)
            const role = await addRole();
            console.log(role);
            return userChoice();

        case `Update an Employee's Role`:
            console.log(`You picked: `, choice)
            const update = await updateEmployee();
            console.log(update);
            return userChoice();

        default:
            // Exit
            console.log('Exiting Application... bye')
            process.exit(1);

    }
}



// CLI Application Start
function init() {
    // Menu Grpahic
    console.log('**************************************************************')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                       EMPLOYEE MENU                        *')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('**************************************************************')

    // Call function
    userChoice();
}
init();









// Original
// Present User Choices
// function userChoice() {
//     inquirer
//         .prompt(startOptions)
//         .then((data) => {
//             switch (data.choice) {
//                 case 'View All Employees':
//                     // Dispaly All Employees
//                     console.log(`You picked: `, data.choice)
//                     return viewAllEmployees();

//                 case 'View All Departments':
//                     // Display All Deparments
//                     console.log(`You picked: `, data.choice)
//                     return viewAllDepartments();

//                 case 'View All Roles':
//                     // Display All Roles
//                     console.log(`You picked: `, data.choice)
//                     return viewAllRoles();

//                 case 'Add an Employee':
//                     // Go to addEmployee
//                     console.log('Add an Employee Picked')
//                     return addEmployee();

//                 case 'Add a Department':
//                     // Go to addDepartment
//                     return addDepartment();

//                 case 'Add a Role':
//                     // Go to addRole
//                     return addRole();

//                 case 'Update an Employee Role':
//                     // Go to updateEmployee
//                     return updateEmployee();

//                 default:
//                     // Exit
//                     console.log('Exiting Application... bye')
//                     process.exit(1);
//             }
//         })
// }




// // First Question
// const startOptions = [
//     {
//         type: 'list',
//         message: 'What would you like to do?',
//         name: 'choice',
//         choices: [
//             'View All Employees',
//             'View All Departments',
//             'View All Roles',
//             'Add an Employee',
//             'Add a Department',
//             'Add a Role',
//             'Update an Employee Role',
//             'Exit'
//         ],
//         default: ['Add a new Engineer']
//     }
// ]
