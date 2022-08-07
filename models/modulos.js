'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Modulos extends Model {
		static associate(models) {
			// define association here
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Perfil Modulos
			this.hasMany(models.PerfilModulos, {
				foreignKey: 'moduloID',
			});
			//Secciones
			this.belongsTo(models.Secciones, {
				foreignKey: 'moduloID',
			});
		}
	}
	Modulos.init(
		{
			descripcion: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Modulos',
		},
	);
	return Modulos;
};
