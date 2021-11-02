"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      Promise.all(
        queryInterface.sequelize.query(
          `
          alter table media add column searchableColumns tsvector;
          `
        )
      ).then(
        queryInterface.sequelize
          .query(
            `
          update media set searchableColumns = to_tsvector(site_code|| ' ' ||city_name|| ' ' ||location);
          `
          ))
    } catch (err)
    {console.error("My database is totally crazy",err);}
    // .error(console.log())
        // .then(
        //   `
        // select * from media where searchableColumns @@to_tsquery('patna');
        // `
        // )
        // .catch(err)
    
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
