'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trabajadores extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioRegistroID'
      });
      this.belongsTo(models.Usuarios, {
        foreignKey: 'usuarioModificacionID'
      });
    }
  }
  Trabajadores.init({
    nombres: DataTypes.STRING,
    primerApellido: DataTypes.STRING,
    segundoApellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: DataTypes.STRING,
    colonia: DataTypes.STRING,
    calles: DataTypes.STRING,
    referencia: DataTypes.STRING,
    numeroExterior: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trabajadores',
    paranoid: true
  });
  return Trabajadores;
};