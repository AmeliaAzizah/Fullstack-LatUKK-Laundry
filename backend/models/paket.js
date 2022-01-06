'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  paket.init({
    id_paket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    jenis_paket: DataTypes.STRING,
    harga: DataTypes.DOUBLE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'paket',
    tableName: 'paket'
  });
  return paket;
};