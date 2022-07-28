'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoPerfiles extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Usuarios, {
        foreignKey: 'perfilID'
      });
      this.hasMany(models.PerfilModulos, {
        foreignKey: 'perfilID'
      });
    }
  }
  TipoPerfiles.init(
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TipoPerfiles',
    }
  );
  return TipoPerfiles;
};
