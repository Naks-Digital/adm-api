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
    // static associate({Post}) {
    //    // define association here
    //   //MediaId
    //   this.hasMany(Post, {foreignKey: 'mediaId'})
    // }

    // toJSON(){
    //   return{...this.get(), id:undefined}
    // }
  };
  Media.init(
    {
       uuid:{
         type: DataTypes.UUID,
         defaultValue:DataTypes.UUIDV4,
       },
    sitecode: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    subenvironment:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    statename:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    cityname:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    location: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    trafficmovement:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    postcode:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    latitude:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    longitude:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    mediavehicle:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    sizew: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    sizeh:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    position:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    mediatype: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    displaycost: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    additionalsizecomments: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    printingmaterial:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    onwerofmedia: {
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