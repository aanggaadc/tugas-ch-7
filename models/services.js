'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class services extends Model {
    static associate(models) {
      services.hasOne(models.file, {
        foreignKey: 'owner_uuid',
        as: 'image'
      })
    }
  }
  services.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    service_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    service_description:{
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'services',
    createdAt: true,
    updatedAt: true,
    freezeTableName: true
  });
  return services;
};