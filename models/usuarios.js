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
			//Clasificaciones
			this.hasMany(models.Clasificaciones, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.Clasificaciones, {
				foreignKey: 'usuarioModificacionID',
			});
			//Herramientas
			this.hasMany(models.Herramientas, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.Herramientas, {
				foreignKey: 'usuarioModificacionID',
			});
			//PaqueteHerramientas
			this.hasMany(models.PaqueteHerramientas, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.PaqueteHerramientas, {
				foreignKey: 'usuarioModificacionID',
			});
			//PaqueteHerramientas
			this.hasMany(models.CapturaPaqueteHerramientas, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.CapturaPaqueteHerramientas, {
				foreignKey: 'usuarioModificacionID',
			});
			//Clientes
			this.hasMany(models.Clientes, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.Clientes, {
				foreignKey: 'usuarioModificacionID',
			});
			//Prestamos
			this.hasMany(models.Prestamos, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.Prestamos, {
				foreignKey: 'usuarioModificacionID',
			});
			//CapturaPrestamosHerramientas
			this.hasMany(models.CapturaPrestamosHerramientas, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.CapturaPrestamosHerramientas, {
				foreignKey: 'usuarioModificacionID',
			});
			//CapturaPrestamosPaqueteHerramientas
			this.hasMany(models.CapturaPrestamosPaqueteHerramientas, {
				foreignKey: 'usuarioRegistroID',
			});
			this.hasMany(models.CapturaPrestamosPaqueteHerramientas, {
				foreignKey: 'usuarioModificacionID',
			});
		}
	}
	Usuarios.init(
		{
			nombre: DataTypes.STRING,
			usuario: DataTypes.STRING,
			password: DataTypes.STRING,
			correo: DataTypes.STRING,
			perfilID: DataTypes.INTEGER,
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
