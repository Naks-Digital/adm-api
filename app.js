const express = require("express");
const { sequelize, Media } = require("./models");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(express.json());
const initRoutes = require("./routes/media.routes");
global.__basedir = "C:/Naks/";

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

Media.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.listen({ port: 5000 }, async () => {
  console.log("server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database connected!");
});

// excel sheet - cost items - crm license cost
//  crm cost | frequency to pay amount && project management tool | frequency to pay amount
//  bitrix                                jira
// crm customization and project management cost

// jira ka on-premise version kitne ka ata hai
// jira ki pricing for 15-20 users for cloud version
// suite crm  and odoo instead of bitrix
