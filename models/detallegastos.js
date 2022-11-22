'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DetalleGastos extends Model {
		static associate(models) {
			//gastos
			this.belongsTo(models.Gastos, {
				as: 'DetalleGastos',
				foreignKey: 'gastoID',
			});
		}
	}
	DetalleGastos.init(
		{
			gastoID: DataTypes.INTEGER,
			descripcion: DataTypes.STRING,
			unidad: DataTypes.INTEGER,
			precio: DataTypes.DECIMAL(10, 2),
			cantidad: DataTypes.INTEGER,
			importe: DataTypes.DECIMAL(10, 2),
			activo: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'DetalleGastos',
		},
	);
	return DetalleGastos;
};
