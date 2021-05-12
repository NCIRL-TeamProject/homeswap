// const path = require('path');
var fs = require('fs');
const fetch = require('node-fetch');
const dataSource = require('./usersToBeProcessed.json');

// let rawdata = fs.readFileSync('./usersToBeProcessed.json');
// let dataSource = JSON.parse(rawdata);
let outputUsers = [];

console.log("Modifying users: " + dataSource.users.length);
for (var i = 0; i < dataSource.users.length; i++) {
    const user = dataSource.users[i];
    const userId = i + 1;
    console.log("Modifying user: " + userId);
    outputUsers.push({
        id: userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    });
}

let output = {
    users: outputUsers
};
let data = JSON.stringify(output);
fs.writeFileSync('users2.json', data);