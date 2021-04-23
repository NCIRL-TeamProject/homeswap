'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeSwapRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HomeSwapRequest.belongsTo(models.User, { foreignKey: 'fromUserId', as: 'fromUser' });
      HomeSwapRequest.belongsTo(models.Home, { foreignKey: 'fromHomeId', as: 'fromHome' });
      HomeSwapRequest.belongsTo(models.User, { foreignKey: 'toUserId', as: 'toUser' });
      HomeSwapRequest.belongsTo(models.Home, { foreignKey: 'toHomeId', as: 'toHome' });
      HomeSwapRequest.hasMany(models.RequestMessage, { foreignKey: 'requestId', as: 'messages' });
    }
  };
  HomeSwapRequest.init({
    checkin: DataTypes.DATE,
    checkout: DataTypes.DATE,
    status: DataTypes.INTEGER,
    toHomeId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER,
    fromHomeId: DataTypes.INTEGER,
    fromUserId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'HomeSwapRequest',
  });
  return HomeSwapRequest;
};