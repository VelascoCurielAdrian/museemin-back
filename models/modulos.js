'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Modulos extends Model {
		static associate(models) {
			// define association here
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			this.hasMany(models.PerfilModulos, {
				foreignKey: 'moduloID',
			});
			this.belongsTo(models.Secciones, {
				foreignKey: 'moduloID',
			});
		}
	}
	Modulos.init(
		{
			descripcion: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Modulos',
		},
	);
	return Modulos;
};
