'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.TipoPerfiles, {
        foreignKey: 'perfilID'
      });
      this.hasMany(models.Usuarios, {
        foreignKey: 'usuarioRegistroID'
      });
      this.hasMany(models.Usuarios, {
        foreignKey: 'usuarioModificacionID'
      });
    }
  }
  Usuarios.init(
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Usuarios',
    }
  );
  return Usuarios;
};
