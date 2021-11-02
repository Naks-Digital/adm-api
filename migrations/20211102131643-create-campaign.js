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
        type: DataTypes.STRING
      },
      end_date: {
        allowNull: false,
        type: DataTypes.STRING
      },
      all_sites: {
        allowNull: false,
        type: DataTypes.STRING
      },
      price_individual_sites:{
        allowNull: false,
        type: DataTypes.STRING
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