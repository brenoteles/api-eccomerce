'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      qtd_estoque: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      preço_custo: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      preço_venda: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      descrição: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('produtos');
  }
};