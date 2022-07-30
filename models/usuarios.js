'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
	class Usuarios extends Model {
		static associate(models) {
			// define association here
			//Perfiles
			this.belongsTo(models.TipoPerfiles, {
				foreignKey: 'perfilID',
			});
			//Secciones
			this.hasMany(models.Secciones, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.Secciones, {
				foreignKey: 'usuarioModificacionID',
			});
			//Modulos
			this.hasMany(models.Modulos, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.Modulos, {
				foreignKey: 'usuarioModificacionID',
			});
			//PerfilModulos
			this.hasMany(models.PerfilModulos, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.PerfilModulos, {
				foreignKey: 'usuarioModificacionID',
			});
			//Trabajadores
			this.hasMany(models.Trabajadores, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.Trabajadores, {
				foreignKey: 'usuarioModificacionID',
			});
		}
	}
	Usuarios.init(
		{
			nombre: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			usuario: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			correo: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			perfilID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Usuarios',
		},
	);

	Usuarios.prototype.validPassword = (password, hash) => {
		return bcrypt.compare(password, hash);
	};
	Usuarios.addHook('beforeValidate', async (usuario) => {
		if (usuario.password) {
			const salt = await bcrypt.genSalt(10);
			usuario.password = await bcrypt.hash(usuario.password, salt);
		}
	});
	return Usuarios;
};
