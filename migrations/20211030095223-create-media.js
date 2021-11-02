'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('media', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      site_code: {
        allowNull: false,
        type: DataTypes.STRING
      },
      sub_environment: {
        allowNull: false,
        type: DataTypes.STRING
      },
      state_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      city_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING
      },
      traffic_movement: {
        allowNull: false,
        type: DataTypes.STRING
      },
      post_code: {
        allowNull: false,
        type: DataTypes.STRING
      },
      latitude: {
        allowNull: false,
        type: DataTypes.STRING
      },
      longitude: {
        allowNull: false,
        type: DataTypes.STRING
      },
      media_vehicle: {
        allowNull: false,
        type: DataTypes.STRING
      },
      size_w: {
        allowNull: false,
        type: DataTypes.STRING
      },
      size_h: {
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        type: DataTypes.STRING
      },
      media_type: {
        allowNull: false,
        type: DataTypes.STRING
      },
      display_cost: {
        allowNull: false,
        type: DataTypes.STRING
      },
      additional_size_comments: {
        allowNull: false,
        type: DataTypes.STRING
      },
      printing_material: {
        allowNull: false,
        type: DataTypes.STRING
      },
      owner_of_media: {
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
    await queryInterface.dropTable('media');
  }
};