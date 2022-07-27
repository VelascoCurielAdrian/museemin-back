'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modulos extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Modulos, {
        foreignKey: 'moduloID'
      });
    }
  }
  Modulos.init({
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Modulos',
  });
  return Modulos;
};