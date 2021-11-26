const express = require("express");
const { sequelize, Media } = require("./models");
const app = express();
app.use(express.json());
const initRoutes = require("./routes/media.routes");
global.__basedir = __dirname + "/..";

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
