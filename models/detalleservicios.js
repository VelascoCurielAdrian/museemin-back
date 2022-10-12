'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DetalleServicios extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Tipo de Servicio
			this.belongsTo(models.TipoServicios, {
				as: 'tipoServicio',
				foreignKey: 'tipoServicioID',
			});
			//Servicio
			this.belongsTo(models.Servicios, {
				as: 'servicio',
				foreignKey: 'servicioID',
			});
		}
	}
	DetalleServicios.init(
		{
			servicioID: DataTypes.INTEGER,
			tipoServicioID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'DetalleServicios',
		},
	);
	return DetalleServicios;
};
