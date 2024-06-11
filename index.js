"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Create an interface to handle user input from the command line
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Function to ask for account ID
function askForAccountID() {
    rl.question('Please enter your account ID: ', function (accountId) {
        console.log("Account ID entered: ".concat(accountId));
        rl.close();
    });
}
// Call the function to ask for account ID
askForAccountID();
