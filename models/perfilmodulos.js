'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PerfilModulos extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Modulo
			this.belongsTo(models.Modulos, {
				foreignKey: 'moduloID',
			});
			//Tipos Perfiles
			this.belongsTo(models.TipoPerfiles, {
				foreignKey: 'perfilID',
			});
		}
	}
	PerfilModulos.init(
		{
			perfilID: DataTypes.INTEGER,
			moduloID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'PerfilModulos',
		},
	);
	return PerfilModulos;
};
