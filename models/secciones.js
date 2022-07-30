'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Secciones extends Model {
		static associate(models) {
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			this.hasMany(models.Modulos, {
				foreignKey: 'moduloID',
			});
		}
	}
	Secciones.init(
		{
			descripcion: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Secciones',
		},
	);
	return Secciones;
};
