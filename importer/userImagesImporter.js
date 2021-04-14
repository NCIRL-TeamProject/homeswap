// const path = require('path');
var fs = require('fs');
const fetch = require('node-fetch');

let rawdata = fs.readFileSync('./inputUsers.json');
let users = JSON.parse(rawdata);
let outputUsers = [];
let i = 1;
let x = 0;

while (x < users.length) {
    var user = users[x++];

    const name = user.host.host_name;
    const imageUrl = user.host.host_picture_url;
    var firstName = name;
    var lastName = name;

    const nameTokens = name.split(" ");
    if (nameTokens.length == 2) {
        firstName = nameTokens[0];
        lastName = nameTokens[1];
    }

    download(imageUrl, { firstName: firstName, lastName: lastName });
}

let output = {
    users: outputUsers
};
let data = JSON.stringify(output);
fs.writeFileSync('users.json', data);


async function download(url, user) {
    fetch(url).then((response) => {

        if (response.status == 200) {
            const buffer = response.buffer().then((buffer) => {
                fs.writeFile('./images/user' + i + '.jpg', buffer, () => {
                    console.log(i + ': image downloaded');
                    i++;
                    outputUsers.push(user);
                });
            });

            return true;
        }

        console.log(i + ': download failed ' + response.status);
        return false;
    }).catch((error) => {
        console.error(i + ' Error:', error);
        return false;
    });
}
