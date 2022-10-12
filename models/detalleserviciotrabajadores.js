'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DetalleServicioTrabajadores extends Model {
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
				foreignKey: 'TrabajadorID',
			});
			//Servicio
			this.belongsTo(models.Servicios, {
				as: 'servicio',
				foreignKey: 'servicioID',
			});
		}
	}
	DetalleServicioTrabajadores.init(
		{
			servicioID: DataTypes.INTEGER,
			trabajadorID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'DetalleServicioTrabajadores',
		},
	);
	return DetalleServicioTrabajadores;
};
