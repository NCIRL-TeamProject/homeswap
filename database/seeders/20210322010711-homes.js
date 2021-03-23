'use strict';
const path = require('path');
var fs = require('fs');

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

    const homes = require('./json/homes.json').homes;
    const imageBasePath = './database/seeders/images/homes';
    let homeArray = []

    homes.forEach((home) => {

      const imagePath = path.resolve(imageBasePath, home['image']);
      console.log(imagePath);
      const bitmap = fs.readFileSync(imagePath);

      var imageAsBase64 = "data:image/webp;base64,";
      imageAsBase64 += bitmap.toString('base64');

      homeArray.push({
        title: home['title'],
        description: home['description'],
        userId: home['userId'],
        published: home['published'],
        image: imageAsBase64,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    });

    return queryInterface.bulkInsert('Homes', homeArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Homes', null, {});
  }


  // function to encode file data to base64 encoded string

};
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}