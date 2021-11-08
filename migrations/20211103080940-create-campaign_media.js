'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('campaigns_media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      campaigns_id:  {
        type: DataTypes.STRING,
        allowNull: false
      },
      site_id:  {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
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
    return Promise.all([
      queryInterface.changeColumn("campaigns_media") 
      // queryInterface.changeColumn...
    ]);
    // await queryInterface.dropTable('campaigns_media');
  }
};