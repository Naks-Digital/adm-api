"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
        ALTER TABLE media add column searchable_column tsvector GENERATED ALWAYS AS (to_tsvector('english',coalesce(site_code, '')) ||to_tsvector('english',coalesce(city_name, '')) ||to_tsvector('english',coalesce(location, ''))) STORED;
        `
    );

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("media", "searchable_column");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
