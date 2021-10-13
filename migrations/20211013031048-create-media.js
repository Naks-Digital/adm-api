'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('mediaDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
      },
      siteCode: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      subEnvironment: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      stateName: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      cityName: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      Location: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      trafficMovement: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      postCode: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      Latitude: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      Longitude: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      mediaVehicle: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      sizeW: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      sizeH: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      Position: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      mediaType: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      displayCost: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      additionalSizeComments: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      printingMaterial: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      onwerOfMedia: {
        type: DataTypes.STRING,
        allowNull:false,
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
    await queryInterface.dropTable('mediaDetails');
  }
};