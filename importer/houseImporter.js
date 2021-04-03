const path = require('path');
var fs = require('fs');
const fetch = require('node-fetch');

let rawdata = fs.readFileSync('./inputHomes.json');
let homes = JSON.parse(rawdata);
let outputHomes = [];

homes.forEach((home, i) => {
    const userId = i + 1;
    const title = home.name;
    const description = home.description;
    const beds = home.beds;
    const bedrooms = home.bedrooms;
    var bathrooms = parseInt(home.bathrooms?.$numberDecimal);
    bathrooms = isNaN(bathrooms) ? 1 : bathrooms;

    const aHome = {
        title: title,
        description: description,
        beds: beds,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        userId: userId,
        published: true
    };

    outputHomes.push(aHome);
});

let output = {
    homes: outputHomes
};
let data = JSON.stringify(output);
fs.writeFileSync('homes.json', data);