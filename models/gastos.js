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
		}
	}
	Gastos.init(
		{
			descripcion: DataTypes.STRING,
			compania: DataTypes.STRING,
			fecha: DataTypes.DATE,
			metodoPago: DataTypes.INTEGER,
			importe: DataTypes.DECIMAL(10, 2),
			diferencia: DataTypes.DECIMAL(10, 2),
			subtotal: DataTypes.DECIMAL(10, 2),
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
