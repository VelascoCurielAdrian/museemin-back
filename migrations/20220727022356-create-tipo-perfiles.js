'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TipoPerfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      estatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'fechaRegistro',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'fechaModificacion',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TipoPerfiles');
  }
};