'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    static associate(models) {
      file.belongsTo(models.portofolio, {
        foreignKey: 'owner_uuid',
        as: 'portofolio'
      })
    }
  }
  file.init({
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    file_url:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    file_name:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    file_size:{
      type: DataTypes.STRING(255),
      allowNull:false
    },
    original_filename: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    owner_uuid:{
      type:DataTypes.UUID,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'file',
    createdAt: true,
    updatedAt: true,
    freezeTableName: true
  });
  return file;
};