"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.addColumn("media", "checkCol", Sequelize.STRING);
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
        )
        .then(
          `
        select * from media where searchableColumns @@to_tsquery('patna');
        `
        ))
    }
     catch (err)
    {console.error("My database is searchable column ",err);}
    //     .catch(err)
    //   // .error(console.log(err))
    // );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("media", "checkCol");
    // Promise.all(
    //   queryInterface.sequelize.query(
    //     `
    //     alter table media drop column searchableColumns;
    //     `
    //   )
    // );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
