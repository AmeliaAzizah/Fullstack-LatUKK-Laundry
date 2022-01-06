'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detail_transaksi', {
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "transaksi",
          key: "id_transaksi"    //primary key of transaksi
        }
      },
      id_paket: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "paket",
          key: "id_paket"    //primary key of paket
        }
      },
      qty: {
        type: Sequelize.DOUBLE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detail_transaksi');
  }
};