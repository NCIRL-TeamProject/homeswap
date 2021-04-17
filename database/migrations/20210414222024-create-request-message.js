'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RequestMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING(256)
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
      .then(() => queryInterface.addConstraint('RequestMessages', {
        fields: ['requestId'],
        type: 'FOREIGN KEY',
        name: 'FK_requestMessages_homeSwapRequests',
        references: {
          table: 'HomeSwapRequests',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }))
      .then(() => queryInterface.addConstraint('RequestMessages', {
        fields: ['userId'],
        type: 'FOREIGN KEY',
        name: 'FK_requestMessages_users',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("RequestMessages", "FK_requestMessages_homeSwapRequests")
      .then(() => queryInterface.removeConstraint("RequestMessages", "FK_requestMessages_users"))
      .then(() => queryInterface.dropTable('RequestMessages'));
  }
};