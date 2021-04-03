// const path = require('path');
var fs = require('fs');
const fetch = require('node-fetch');

let rawdata = fs.readFileSync('./inputHomes.json');
let homes = JSON.parse(rawdata);

homes.forEach((home, i) => {
    const imageUrl = home.images?.picture_url;
    download(imageUrl, i + 1);
});

async function download(url, imageName) {
    fetch(url).then((response) => {
        const buffer = response.buffer().then((buffer) => {
            fs.writeFile('./images/home' + imageName + '.jpg', buffer, () =>
                console.log('finished downloading!'));
        });
    })
}
