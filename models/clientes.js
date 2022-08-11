'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    static associate(models) {
      // Usuarios
      this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
    }
  }
  Clientes.init({
    nombre: DataTypes.STRING,
    primerTelefono: DataTypes.STRING,
    segundoTelefono: DataTypes.STRING,
    correo: DataTypes.STRING,
    domicilio: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
    estatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Clientes',
  });
  return Clientes;
};