"use strict";
const { Model } = require("sequelize");
const { media } = require("./media");
module.exports = (sequelize, DataTypes) => {
  class campaigns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  campaigns.init(
    {
      campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      campaign_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price_whole_campaign: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_terms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "campaigns",
    }
  );

  campaigns.associate = (models) => {
    campaigns.belongsToMany(models.campaigns, {
      as: "campaigns",
      through: "campaigns_n_media",
    });
  };

  // campaigns.belongsToMany(media, { through: "campaigns_n_media" });

  return campaigns;
};
