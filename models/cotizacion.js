'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cotizacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cotizacion.init({
    concepto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cotizacion',
  });
  return Cotizacion;
};