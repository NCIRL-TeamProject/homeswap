'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Homes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING
      },
      published: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      image: {
        allowNull: true,
        type: Sequelize.BLOB
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
      .then(() => queryInterface.addConstraint('Homes', {
        fields: ['userId'],
        type: 'FOREIGN KEY',
        name: 'FK_homes_users',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Homes", "FK_homes_users")
      .then(() => queryInterface.dropTable('Homes'));
  }
};