'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Home, { foreignKey: 'userId', as: 'homes' });
      User.hasMany(models.HomeSwapRequest, { foreignKey: 'fromUserId', as: 'homeswaprequests' });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dbo: DataTypes.STRING,
    profileImage: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};