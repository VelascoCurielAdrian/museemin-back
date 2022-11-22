'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Gastos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			descripcion: {
				type: Sequelize.STRING,
			},
			metodoPago: {
				type: Sequelize.INTEGER,
			},
			importe: {
				type: Sequelize.DECIMAL(10, 2),
			},
			diferencia: {
				type: Sequelize.DECIMAL(10, 2),
			},
			subTotal: {
				type: Sequelize.DECIMAL(10, 2),
			},
			total: {
				type: Sequelize.DECIMAL(10, 2),
			},
			compania: {
				type: Sequelize.STRING,
			},
			fecha: {
				type: Sequelize.DATE,
			},
			tipoGasto: {
				type: Sequelize.INTEGER,
			},
			clienteID: {
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
				},
				references: {
					model: 'Clientes',
					key: 'id',
				},
			},
			trabajadorID: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
				},
				references: {
					model: 'Trabajadores',
					key: 'id',
				},
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
		await queryInterface.dropTable('Gastos');
	},
};
