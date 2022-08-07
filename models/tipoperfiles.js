'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TipoPerfiles extends Model {
		static associate(models) {
			// Usuarios
			this.hasMany(models.Usuarios, {
				foreignKey: 'perfilID',
			});
			this.hasMany(models.PerfilModulos, {
				foreignKey: 'perfilID',
			});
		}
	}
	TipoPerfiles.init(
		{
			nombre: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'TipoPerfiles',
		},
	);
	return TipoPerfiles;
};
