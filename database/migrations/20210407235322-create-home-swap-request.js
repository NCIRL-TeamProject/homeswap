'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HomeSwapRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkin: {
        type: Sequelize.DATE
      },
      checkout: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      toHomeId: {
        type: Sequelize.INTEGER
      },
      fromUserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => queryInterface.addConstraint('HomeSwapRequests', {
        fields: ['toHomeId'],
        type: 'FOREIGN KEY',
        name: 'FK_homeSwapRequests_homes',
        references: {
          table: 'Homes',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }))
      .then(() => queryInterface.addConstraint('HomeSwapRequests', {
        fields: ['fromUserId'],
        type: 'FOREIGN KEY',
        name: 'FK_homeSwapRequests_users',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("HomeSwapRequests", "FK_homeSwapRequests_homes")
      .then(() => queryInterface.removeConstraint("HomeSwapRequests", "FK_homeSwapRequests_users"))
      .then(() => queryInterface.dropTable('HomeSwapRequests'));
  }
};