'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Servicios', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			comentarios: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			fecha: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			hora: {
				type: Sequelize.TIME,
				allowNull: true,
				defaultValue: new Date(),
			},
			clienteID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Clientes',
					key: 'id',
				},
			},
			estatus: {
				type: Sequelize.INTEGER,
				allowNull: false,
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
		await queryInterface.dropTable('Servicios');
	},
};
