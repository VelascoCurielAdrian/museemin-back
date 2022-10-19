'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PaqueteHerramientas extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Paquete Herramientas
			this.hasMany(models.CapturaPaqueteHerramientas, {
				foreignKey: 'paqueteHerramientaID',
			});
		}
	}
	PaqueteHerramientas.init(
		{
			descripcion: DataTypes.STRING,
			imagen: DataTypes.STRING,
			activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'PaqueteHerramientas',
		},
	);
	return PaqueteHerramientas;
};
