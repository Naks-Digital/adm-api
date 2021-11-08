'use strict';

// const { INTEGER, DataTypes } = require("sequelize/types");

module.exports = {
  up: async (queryInterface,DataTypes) => {
    console.log("start");
      await queryInterface.changeColumn("campaigns_media", "campaigns_id", {
    references: {
          model:'campaigns',
          key:'id',
          foreignKey: true,
        }

      });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("campaigns_media", "campaigns_id", {
      references: {
            model:'campaigns',
            key:'id',
            foreignKey: true,
          }
  
        });
    // await queryInterface.changeColumn('campaigns_id');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
