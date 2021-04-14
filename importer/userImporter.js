// const path = require('path');
var fs = require('fs');
const fetch = require('node-fetch');

let rawdata = fs.readFileSync('./inputUsers.json');
let users = JSON.parse(rawdata);
let outputUsers = [];

for (var i = 0; i < users.length && i < 200; i++) {
    const user = users[i];
    const name = user.host.host_name;
    var firstName = name;
    var lastName = name;

    const nameTokens = name.split(" ");
    if (nameTokens.length == 2) {
        firstName = nameTokens[0];
        lastName = nameTokens[1];
    }

    outputUsers.push({ firstName: firstName, lastName: lastName });
}

let output = {
    users: outputUsers
};
let data = JSON.stringify(output);
fs.writeFileSync('users.json', data);