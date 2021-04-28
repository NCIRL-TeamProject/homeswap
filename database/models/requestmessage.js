'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RequestMessage.belongsTo(models.HomeSwapRequest, { foreignKey: 'requestId', as: 'request' });
      RequestMessage.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };
  RequestMessage.init({
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'RequestMessage',
  });
  return RequestMessage;
};