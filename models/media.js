'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
       // define association here
      //MediaId
      this.hasMany(Post, {foreignKey: 'mediaId'})
    }

    toJSON(){
      return{...this.get(), id:undefined}
    }
  };
  Media.init(
    {
       uuid:{
         type: DataTypes.UUID,
         defaultValue:DataTypes.UUIDV4,
       },
    siteCode: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    subEnvironment:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    stateName:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    cityName:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    Location: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    trafficMovement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    postCode:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    Latitude:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    Longitude:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    mediaVehicle:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    sizeW: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    sizeH:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    Position:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    mediaType: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    displayCost: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    additionalSizeComments: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    printingMaterial:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    onwerOfMedia: {
      type:DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName: 'mediaDetails',
    modelName: 'Media',
  });
  return Media;
};