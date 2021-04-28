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
        allowNull: false,
        type: Sequelize.DATE
      },
      checkout: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      toHomeId: {
        type: Sequelize.INTEGER
      },
      toUserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fromHomeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fromUserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
      .then(() => queryInterface.addConstraint('HomeSwapRequests', {
        fields: ['toHomeId'],
        type: 'FOREIGN KEY',
        name: 'FK_homeSwapRequests_toHomes',
        references: {
          table: 'Homes',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }))
      .then(() => queryInterface.addConstraint('HomeSwapRequests', {
        fields: ['toUserId'],
        type: 'FOREIGN KEY',
        name: 'FK_homeSwapRequests_toUsers',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }))
      .then(() => queryInterface.addConstraint('HomeSwapRequests', {
        fields: ['fromHomeId'],
        type: 'FOREIGN KEY',
        name: 'FK_homeSwapRequests_fromHomes',
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
        name: 'FK_homeSwapRequests_fromUsers',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("HomeSwapRequests", "FK_homeSwapRequests_toHomes")
      .then(() => queryInterface.removeConstraint("HomeSwapRequests", "FK_homeSwapRequests_toUsers"))
      .then(() => queryInterface.removeConstraint("HomeSwapRequests", "FK_homeSwapRequests_fromHomes"))
      .then(() => queryInterface.removeConstraint("HomeSwapRequests", "FK_homeSwapRequests_fromUsers"))
      .then(() => queryInterface.dropTable('HomeSwapRequests'));
  }
};