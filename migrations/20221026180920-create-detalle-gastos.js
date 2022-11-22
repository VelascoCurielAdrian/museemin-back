'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('DetalleGastos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			gastoID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'Gastos',
					key: 'id',
				},
			},
			descripcion: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			unidad: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			precio: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2),
			},
			cantidad: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			importe: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2),
			},
			activo: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
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
		await queryInterface.dropTable('DetalleGastos');
	},
};
