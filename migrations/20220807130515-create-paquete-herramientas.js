'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('PaqueteHerramientas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			descripcion: {
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
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('PaqueteHerramientas');
	},
};
