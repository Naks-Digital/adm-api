"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class campaigns_n_media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  campaigns_n_media.init(
    {
      id_from_campaigns: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_from_media: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      media_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      media_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "campaigns_n_media",
    }
  );
  return campaigns_n_media;
};
