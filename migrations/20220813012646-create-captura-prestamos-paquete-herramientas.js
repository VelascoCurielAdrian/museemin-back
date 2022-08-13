'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('CapturaPrestamosPaqueteHerramientas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
      prestamoID: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
				},
				references: {
					model: 'Prestamos',
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
			usuarioRegistroID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      usuarioModificacionID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('CapturaPrestamosPaqueteHerramientas');
	},
};
