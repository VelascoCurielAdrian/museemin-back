'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Herramientas extends Model {
		static associate(models) {
			//Usuarios
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioRegistroID',
			});
			this.belongsTo(models.Usuarios, {
				foreignKey: 'usuarioModificacionID',
			});
			//Clasificacion
			this.belongsTo(models.Clasificaciones, {
        as: 'clasificacion',
				foreignKey: 'clasificacionID',
			});
		}
	}
	Herramientas.init(
		{
			nombre: DataTypes.STRING,
			descripcion: DataTypes.STRING,
      precio: DataTypes.DECIMAL,
      marca: DataTypes.STRING,
      estado: DataTypes.STRING,
      activo: DataTypes.BOOLEAN,
			estatus: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'Herramientas',
		},
	);
	return Herramientas;
};
