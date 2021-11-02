'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Promise.all(
    //   queryInterface.sequelize.query(
        
    //   )
    // ).then(
    //   queryInterface.sequelize.query(
    //     `
    //     update media set searchableColumns = to_tsvector(site_code|| ' ' ||city_name|| ' ' ||location);
    //     `
    //   ).then(
    //     `
    //     select * from media where searchableColumns @@to_tsquery('patna');
    //     `
    //   ).catch(err)
      // .error(console.log(err))
    // )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
