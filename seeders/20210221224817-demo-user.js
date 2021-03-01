'use strict';

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

    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'user 1',
      lastName: 'user 1',
      email: 'user1@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'user 2',
      lastName: 'user 2',
      email: 'user2@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'user 3',
      lastName: 'user 3',
      email: 'user3@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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
