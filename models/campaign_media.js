'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class campaigns_media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  campaigns_media.init({
    campaigns_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    site_id:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'campaigns_media',
  });

  campaigns_media.associate = models => {
    campaigns_media.belongsToMany(models.campaign, { through: 'campaigns_media'});
  };

  return campaigns_media;
};