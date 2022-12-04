'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Cotizaciones extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Cliente
			this.belongsTo(models.Clientes, {
				as: 'cliente',
				foreignKey: 'clienteID',
			});
			// CotizacionDetalles
			this.hasMany(models.CotizacionDetalles, {
				foreignKey: 'cotizacionID',
			});
			// Gastos
			this.hasMany(models.Gastos, {
				foreignKey: 'cotizacionID',
			});
		}
	}
	Cotizaciones.init(
		{
			descripcion: DataTypes.STRING,
			fecha: DataTypes.DATE,
			clienteID: DataTypes.INTEGER,
			proceso: DataTypes.INTEGER,
			subTotal: DataTypes.DECIMAL(10, 2),
			activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Cotizaciones',
		},
	);
	return Cotizaciones;
};
