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
      sitecode: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      subenvironment: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      statename: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      cityname: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      trafficmovement: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      mediavehicle: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      sizew: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      sizeh: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      mediatype: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      displaycost: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      additionalsizecomments: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      printingmaterial: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      onwerofmedia: {
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