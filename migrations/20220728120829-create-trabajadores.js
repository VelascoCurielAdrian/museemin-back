'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Trabajadores', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nombres: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			primerApellido: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			segundoApellido: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			sexo: {
				type: Sequelize.CHAR(1),
				allowNull: false,
			},
			telefono: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			correo: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			colonia: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			calles: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			referencia: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			numeroExterior: {
				type: Sequelize.STRING(10),
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
		await queryInterface.dropTable('Trabajadores');
	},
};
