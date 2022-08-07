'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CapturaPaqueteHerramientas extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Herramientas
			this.belongsTo(models.Herramientas, {
				as: 'herramienta',
				foreignKey: 'herramientaID',
			});
			//Paquete Herramientas
			this.belongsTo(models.PaqueteHerramientas, {
				as: 'paqueteHerramienta',
				foreignKey: 'paqueteHerramientaID',
			});
		}
	}
	CapturaPaqueteHerramientas.init(
		{
			descripcion: DataTypes.STRING,
			estado: DataTypes.STRING,
			activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'CapturaPaqueteHerramientas',
		},
	);
	return CapturaPaqueteHerramientas;
};
