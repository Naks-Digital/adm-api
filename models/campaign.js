'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  campaign.init({
    campaign_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end_date:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    all_sites:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_individual_sites:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_whole_campaign:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    payment_terms:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'campaign',
  });
  return campaign;
};