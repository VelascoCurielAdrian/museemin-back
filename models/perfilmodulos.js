'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PerfilModulos extends Model {
    static associate(models) {
      this.belongsTo(models.Modulos, {
        foreignKey: 'moduloID'
      });
      this.belongsTo(models.TipoPerfiles, {
        foreignKey: 'perfilID'
      });   
    }
  }
  PerfilModulos.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PerfilModulos',
  });
  return PerfilModulos;
};