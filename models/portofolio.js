'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class portofolio extends Model {
    static associate(models) {
      portofolio.hasOne(models.file, {
        foreignKey: 'portofolio_uuid',
        as: 'image'
      })
    }
  }
  portofolio.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    project_name:{
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'portofolio',
    createdAt: true,
    updatedAt: true,
    freezeTableName: true
  });
  return portofolio;
};