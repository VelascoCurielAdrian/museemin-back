'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PerfilModulos extends Model {
		static associate(models) {
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			this.belongsTo(models.Modulos, {
				foreignKey: 'moduloID',
			});
			this.belongsTo(models.TipoPerfiles, {
				foreignKey: 'perfilID',
			});
		}
	}
	PerfilModulos.init(
		{
			descripcion: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			perfilID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			moduloID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'PerfilModulos',
		},
	);
	return PerfilModulos;
};
