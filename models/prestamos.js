'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Prestamos extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Trabajador
			this.belongsTo(models.Trabajadores, {
				as: 'trabajador',
				foreignKey: 'trabajadorID',
			});
			//CapturaPrestamosHerramientas
			this.hasMany(models.CapturaPrestamosHerramientas, {
				foreignKey: 'prestamoID',
			});
			//CapturaPrestamosPaqueteHerramientas
			this.hasMany(models.CapturaPrestamosPaqueteHerramientas, {
				foreignKey: 'prestamoID',
			});
		}
	}
	Prestamos.init(
		{
			descripcion: DataTypes.STRING,
			estado: DataTypes.STRING,
			semana: DataTypes.STRING,
			fechaEntrega: DataTypes.DATE,
			fechaSalida: DataTypes.DATE,
			estatus: DataTypes.BOOLEAN,
			activo: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Prestamos',
		},
	);
	return Prestamos;
};
