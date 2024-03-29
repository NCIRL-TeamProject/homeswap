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
      User.hasMany(models.HomeSwapRequest, { foreignKey: 'fromUserId', as: 'fromhomeswaprequests' });
      User.hasMany(models.HomeSwapRequest, { foreignKey: 'toUserId', as: 'tohomeswaprequests' });
      User.hasMany(models.RequestMessage, { foreignKey: 'userId', as: 'requestmessages' });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dbo: DataTypes.STRING,
    profileImage: DataTypes.BLOB,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User'
  });
  return User;
};