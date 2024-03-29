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
      Home.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Home.hasMany(models.HomeSwapRequest, { foreignKey: 'toHomeId', as: 'tohomeswaprequests' });
      Home.hasMany(models.HomeSwapRequest, { foreignKey: 'fromHomeId', as: 'fromhomeswaprequests' });
    }
  };
  Home.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    beds: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    county: DataTypes.STRING,
    country: DataTypes.STRING,
    postCode: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    image: DataTypes.BLOB,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Home',
  });
  return Home;
};