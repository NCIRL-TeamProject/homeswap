'use strict';
var bcrypt = require("bcryptjs");
const path = require('path');
var fs = require('fs');

function getRandomDob() {
  var dob;

  //set a range of years
  var min = 1930;
  var max = 2004;

  // Math.ceil prevents the value from being 0;
  var month = Math.ceil(Math.random() * 12);
  var day = Math.ceil(Math.random() * 28);
  var year = Math.floor(Math.random() * (max - min) + min);

  //this ensures that the format will stay mm/dd/yyyy;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  //concatenates random dob in mm/dd/yyyy format;
  dob = month + "/" + day + "/" + year;

  return dob;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const usersFromJson = require('./json/users.json').users;
    const imageBasePath = './database/seeders/images/users';
    let users = [];
    const password = bcrypt.hashSync('Test12345!', 8);

    fs.readdir(imageBasePath, (err, files) => {
      //handling error
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }

      files.forEach((file, i) => {
        const imagePath = path.resolve(imageBasePath, file);
        const bitmap = fs.readFileSync(imagePath);
        var imageAsBase64 = "data:image/webp;base64,";
        imageAsBase64 += bitmap.toString('base64');
        const user = usersFromJson[i];

        users.push({
          firstName: user['firstName'],
          lastName: user['lastName'],
          email: user['firstName'] + '@hsapp.com',
          password: password,
          dbo: getRandomDob(),
          profileImage: imageAsBase64,
          createdAt: new Date(),
          updatedAt: new Date()
        })

      });

      return queryInterface.bulkInsert('Users', users);
    })


    // var usersArray = [];
    // for (var i = 1; i <= 170; i++) {
    //   usersArray.push({
    //     firstName: 'firstName' + i,
    //     lastName: 'lastName' + i,
    //     email: 'user' + i + '@example.com',
    //     password: password,
    //     dbo: getRandomDob(),
    //     profileImage: "data:image/webp;base64,",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   })
    // }

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
