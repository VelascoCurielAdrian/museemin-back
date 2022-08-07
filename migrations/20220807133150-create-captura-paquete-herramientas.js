'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('CapturaPaqueteHerramientas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			descripcion: {
				type: Sequelize.STRING,
			},
			estado: {
				type: Sequelize.STRING,
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
			createdAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			usuarioModificacionID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Usuarios',
					key: 'id',
				},
			},
			updatedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
			herramientaID: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
				},
				references: {
					model: 'Herramientas',
					key: 'id',
				},
			},
			paqueteHerramientaID: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
				},
				references: {
					model: 'PaqueteHerramientas',
					key: 'id',
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('CapturaPaqueteHerramientas');
	},
};
