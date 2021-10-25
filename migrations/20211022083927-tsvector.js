"use strict";

const vectorName = "search";

const searchObjects = [
  "sitecode",
  "subenvironment",
  "cityname",
  "location",
  "trafficmovement",
  "postcode",
  "latitude",
  "longitude",
  "mediavehicle",
  "sizew",
  "sizeh",
  "position",
  "mediatype",
  "displaycost",
  "additionalsizecomments",
  "printingmaterial",
  "onwerofmedia",
];

module.exports = {
  up: async (queryInterface, DataTypes) => {
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) =>
          queryInterface.sequelize
            .query(
              `
          ALTER TABLE ${table} ADD COLUMN ${vectorName} TSVECTOR;
        `,
              { transaction: t }
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                UPDATE ${table} SET ${vectorName} = to_tsvector('english', ${searchObjects[
                  table
                ].join(" || ' ' || ")});
              `,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                CREATE INDEX ${table}_search ON ${table} USING gin(${vectorName});
              `,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                CREATE TRIGGER ${table}_vector_update
                BEFORE INSERT OR UPDATE ON ${table}
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.english', ${searchObjects[
                  table
                ].join(", ")});
              `,
                { transaction: t }
              )
            )
            .error(console.log)
        )
      )
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, DataTypes) => {
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) =>
          queryInterface.sequelize
            .query(
              `
          DROP TRIGGER ${table}_vector_update ON ${table};
        `,
              { transaction: t }
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                DROP INDEX ${table}_search;
              `,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                ALTER TABLE ${table} DROP COLUMN ${vectorName};
              `,
                { transaction: t }
              )
            )
        )
      )
    );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
