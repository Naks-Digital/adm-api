'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      campaign_name:{
        allowNull: false,
        type: DataTypes.STRING
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      price_whole_campaign: {
        allowNull: false,
        type: DataTypes.STRING
      },
      payment_terms: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('campaigns');
  }
};