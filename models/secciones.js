'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Secciones extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Modulos
			this.hasMany(models.Modulos, {
				foreignKey: 'moduloID',
			});
		}
	}
	Secciones.init(
		{
			descripcion: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Secciones',
		},
	);
	return Secciones;
};
