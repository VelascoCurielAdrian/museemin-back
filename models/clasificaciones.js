'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Clasificaciones extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Herramienta
			this.hasMany(models.Herramientas, {
				foreignKey: 'clasificacionID',
			});
		}
	}
	Clasificaciones.init(
		{
			descripcion: DataTypes.STRING,
			activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Clasificaciones',
		},
	);
	return Clasificaciones;
};
