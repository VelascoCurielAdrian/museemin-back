'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CapturaPrestamosHerramientas extends Model {
    static associate(models) {
      //Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
      //Herramientas
      this.belongsTo(models.Herramientas, {
				as: 'herramienta',
				foreignKey: 'herramientaID',
			});
      //Prestamos
      this.belongsTo(models.Prestamos, {
				as: 'prestamo',
				foreignKey: 'prestamoID',
			});
    }
  }
  CapturaPrestamosHerramientas.init({
    herramientaID: DataTypes.INTEGER,
    prestamoID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CapturaPrestamosHerramientas',
  });
  return CapturaPrestamosHerramientas;
};