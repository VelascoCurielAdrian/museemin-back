'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TipoServicios extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
		}
	}
	TipoServicios.init(
		{
			descripcion: DataTypes.STRING,
			activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'TipoServicios',
		},
	);
	return TipoServicios;
};
