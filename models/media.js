"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return { ...this.get(), uuid: undefined, id: undefined}
    }
  }
  Media.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      site_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sub_environment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      traffic_movement: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      media_vehicle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      size_w: {
        type: DataTypes.STRING,
        allowNull: false
      },
      size_h: {
        type: DataTypes.STRING,
        allowNull: false
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      media_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      display_cost: {
        type: DataTypes.STRING,
        allowNull: false
      },
      additional_size_comments: {
        type: DataTypes.STRING,
        allowNull: false
      },
      printing_material: {
        type: DataTypes.STRING,
        allowNull: false
      },
      owner_of_media: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: "media",
      modelName: "Media",
    }
  );
  return Media;
};
