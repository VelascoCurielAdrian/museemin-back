'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Servicios extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Clientes
			this.belongsTo(models.Clientes, {
				as: 'cliente',
				foreignKey: 'clienteID',
			});
			// DetalleServicios
			this.hasMany(models.DetalleServicios, {
				foreignKey: 'servicioID',
			});
			// DetalleServicioTrabajadores
			this.hasMany(models.DetalleServicioTrabajadores, {
				foreignKey: 'servicioID',
			});
		}
	}
	Servicios.init(
		{
			comentarios: DataTypes.STRING,
			clienteID: DataTypes.INTEGER,
			estatus: DataTypes.INTEGER,
			fecha: DataTypes.DATE,
			hora: DataTypes.TIME,
		},
		{
			sequelize,
			modelName: 'Servicios',
		},
	);
	return Servicios;
};
