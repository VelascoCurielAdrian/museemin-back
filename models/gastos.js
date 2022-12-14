'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Gastos extends Model {
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
			//Cliente
			this.belongsTo(models.Clientes, {
				as: 'cliente',
				foreignKey: 'clienteID',
			});
			// DetalleGastos
			this.hasMany(models.DetalleGastos, {
				foreignKey: 'gastoID',
			});
			//Cotzaciones
			this.belongsTo(models.Cotizaciones, {
				as: 'Cotizaciones',
				foreignKey: 'cotizacionID',
			});
		}
	}
	Gastos.init(
		{
			descripcion: DataTypes.STRING,
			compania: DataTypes.STRING,
			fecha: DataTypes.DATE,
			metodoPago: DataTypes.INTEGER,
			tipoGasto: DataTypes.INTEGER,
			clienteID: DataTypes.INTEGER,
			cotizacionID: DataTypes.INTEGER,
			trabajadorID: DataTypes.INTEGER,
			importe: DataTypes.DECIMAL(10, 2),
			diferencia: DataTypes.DECIMAL(10, 2),
			subTotal: DataTypes.DECIMAL(10, 2),
			total: DataTypes.DECIMAL(10, 2),
			activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Gastos',
		},
	);
	return Gastos;
};
