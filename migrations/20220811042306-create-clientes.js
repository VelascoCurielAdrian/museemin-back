'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Clientes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nombre: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			primerTelefono: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			segundoTelefono: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			correo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			colonia: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			calles: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			referencia: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			numeroExterior: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			codigoPostal: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			numeroInterior: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			activo: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			estatus: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			usuarioRegistroID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Usuarios',
					key: 'id',
				},
			},
			usuarioModificacionID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Usuarios',
					key: 'id',
				},
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Clientes');
	},
};
