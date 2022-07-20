"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("campaigns_n_media", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_from_campaigns: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "campaigns",
          key: "id",
        },
      },
      id_from_media: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "media",
          key: "id",
        },
      },
      media_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      media_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("campaigns_n_media");
  },
};
