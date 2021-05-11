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
    const addresses = require('./json/addresses.json').addresses;
    const imageBasePath = './database/seeders/images/homes';
    let homeArray = []

    homes.forEach((home, i) => {
      const address = home?.addressId ?
        addresses.find(x => x.id == home?.addressId) :
        addresses[Math.floor(Math.random() * addresses.length)];

      const image = home['image'] ?? 'home' + (i + 1) + '.jpg';
      const imagePath = path.resolve(imageBasePath, image);
      const bitmap = fs.readFileSync(imagePath);

      var imageAsBase64 = "data:image/webp;base64,";
      imageAsBase64 += bitmap.toString('base64');

      homeArray.push({
        title: home['title'],
        description: home['description'].substring(0, 512),
        userId: home['userId'],
        published: home['published'],
        streetAddress: address['addressLine1'],
        city: address['townCity'],
        county: address['county'],
        country: address['country'],
        postCode: address['postCode'],
        bathrooms: home['bathrooms'],
        bedrooms: home['bedrooms'],
        beds: home['beds'] ?? 1,
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