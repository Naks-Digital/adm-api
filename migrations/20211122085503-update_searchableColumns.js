"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Promise.all(
      queryInterface.sequelize.query(
        `

        update media set searchableColumns = to_tsvector GENERATED ALWAYS AS (site_code|| ' ' ||city_name|| ' ' ||location);
       `
      )
    ).then(
      queryInterface.sequelize.query(
        `
          STORED;
          `
      )
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("media", "searchableColumns");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
