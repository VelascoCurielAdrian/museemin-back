'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Trabajadores extends Model {
		static associate(models) {
			// Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			// Prestamos
			this.hasMany(models.Prestamos, {
				foreignKey: 'trabajadorID',
			});
			// DetalleServicioTrabajadores
			this.hasMany(models.DetalleServicioTrabajadores, {
				foreignKey: 'trabajadorID',
			});
		}
	}
	Trabajadores.init(
		{
			nombres: DataTypes.STRING,
			primerApellido: DataTypes.STRING,
			segundoApellido: DataTypes.STRING,
			sexo: DataTypes.CHAR,
			telefono: DataTypes.STRING,
			correo: DataTypes.STRING,
			colonia: DataTypes.STRING,
			calles: DataTypes.STRING,
			referencia: DataTypes.STRING,
			numeroExterior: DataTypes.STRING,
			activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Trabajadores',
		},
	);
	return Trabajadores;
};
