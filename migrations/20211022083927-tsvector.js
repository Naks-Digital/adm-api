"use strict";

const vectorName = "search";

const searchObjects = {
  sitecode: ["Site No-7"],
  subenvironment: ["Highway"],
  statename: ["Delhi"],
  cityname: ["Delhi"],
  location: ["DND Flyway"],
  trafficmovement: ["Delhi to Noida"],
  postcode: ["110091"],
  latitude: ["28.578605"],
  longitude: ["77.277369"],
  mediavehicle: ["Unipole"],
  sizew: ["30"],
  sizeh: ["15"],
  position: ["Left"],
  mediatype: ["Lit"],
  displaycost: ["675000"],
  additionalsizecomments: ["Nothing"],
  printingmaterial: ["Blackback 280 GSM"],
  onwerofmedia: ["Naks"],
};

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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
