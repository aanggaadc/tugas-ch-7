'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contactus extends Model {
  
    static associate(models) {

    }
  }
  contactus.init({
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    message:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'contactus',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true
  });
  return contactus;
};