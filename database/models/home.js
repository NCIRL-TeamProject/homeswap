'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Home extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Home.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
  };
  Home.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    postCode: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Home',
  });
  return Home;
};