'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CapturaPrestamosPaqueteHerramientas extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//PaqueteHerramientas
			this.belongsTo(models.PaqueteHerramientas, {
				as: 'paqueteHerramienta',
				foreignKey: 'paqueteHerramientaID',
			});
			//Prestamos
			this.belongsTo(models.Prestamos, {
				as: 'prestamo',
				foreignKey: 'prestamoID',
			});
		}
	}
	CapturaPrestamosPaqueteHerramientas.init(
		{
			paqueteHerramientaID: DataTypes.INTEGER,
			prestamoID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'CapturaPrestamosPaqueteHerramientas',
		},
	);
	return CapturaPrestamosPaqueteHerramientas;
};
