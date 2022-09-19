"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Herramientas", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nombre: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			descripcion: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			precio: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			marca: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			estado: {
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
					model: "Usuarios",
					key: "id",
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
					model: "Usuarios",
					key: "id",
				},
			},
			updatedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
			clasificacionID: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: {
					isInt: true,
				},
				references: {
					model: "Clasificaciones",
					key: "id",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Herramientas");
	},
};
