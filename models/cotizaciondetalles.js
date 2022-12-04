'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CotizacionDetalles extends Model {
		static associate(models) {
			//Cotzaciones
			this.belongsTo(models.Gastos, {
				as: 'CotizacionDetalles',
				foreignKey: 'cotizacionID',
			});
		}
	}
	CotizacionDetalles.init(
		{
			cotizacionID: DataTypes.INTEGER,
			descripcion: DataTypes.STRING,
			unidad: DataTypes.INTEGER,
			precio: DataTypes.DECIMAL(10, 2),
			cantidad: DataTypes.INTEGER,
			importe: DataTypes.DECIMAL(10, 2),
			activo: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'CotizacionDetalles',
		},
	);
	return CotizacionDetalles;
};
