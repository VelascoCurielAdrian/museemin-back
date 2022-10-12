'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('DetalleServicios', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			servicioID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Servicios',
					key: 'id',
				},
			},
			tipoServicioID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'TipoServicios',
					key: 'id',
				},
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
		await queryInterface.dropTable('DetalleServicios');
	},
};
