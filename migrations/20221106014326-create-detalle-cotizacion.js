'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleCotizacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
      descripcion: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			partida: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleCotizacions');
  }
};