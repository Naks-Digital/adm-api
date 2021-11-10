const { log } = require("console");
const { response } = require("express");
const express = require("express");
const { request } = require("http");
const { sequelize, Media } = require("./models");
const media = require("./models/media");
const { isNullOrEmpty } = require("./utils");
const app = express();
app.use(express.json());

app.post("/media", async (req, res) => {
  const {
    site_code,
    sub_environment,
    state_name,
    city_name,
    location,
    traffic_movement,
    post_code,
    latitude,
    longitude,
    media_vehicle,
    size_w,
    size_h,
    position,
    media_type,
    display_cost,
    additional_size_comments,
    printing_material,
    owner_of_media,
  } = req.body;
  try {
    const postMedia = await Media.create({
      site_code,
      sub_environment,
      state_name,
      city_name,
      location,
      traffic_movement,
      post_code,
      latitude,
      longitude,
      media_vehicle,
      size_w,
      size_h,
      position,
      media_type,
      display_cost,
      additional_size_comments,
      printing_material,
      owner_of_media,
    });

    return res.json(postMedia);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
});

// app.post('/media', (rqst, resp) => {
//   console.log("I got a request!!");
//   console.log(rqst.body);
//   resp.json({
//     stat: "success",
//     city: city
//   })
// })

app.get("/media", async (req, res) => {
  try {
    var paramsString = "";
    var sql = "";
    var modifiedSiteCode = "";
    const len = Object.keys(req.query).length;
    if (len != 0) {
      const rem = req.query.site_code.toString();
      console.log("djhefdgjfsb" + rem);
      modifiedSiteCode = rem.split(" ").join("&");
      console.log(rem.split(" ").join("&"));
      paramsString =
        (isNullOrEmpty(modifiedSiteCode) ? modifiedSiteCode : "") +
        "&" +
        (isNullOrEmpty(req.query.city_name) ? req.query.city_name : "") +
        "&" +
        (isNullOrEmpty(req.query.location) ? req.query.location : "");
      // sql =
      //   `select state_name, traffic_movement , post_code from media where searchableColumns @@to_tsquery('` +
      //   paramsString +
      //   `')`;
      sql =
        `select * from media where searchableColumns @@to_tsquery('` +
        paramsString +
        `')`;
    } else {
      sql = `select * from media`;
    }
    console.log("I am the string of concatenated parameters" + paramsString);

    const getMedia = await sequelize
      .query(sql, media, null, paramsString)
      .then(function (resultedData) {
        // console.log(resultedData);
        return res.json(resultedData[0]);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/media/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const getOneMedia = await Media.findOne({
      where: { id },
    });
    return res.json(getOneMedia);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database connected!");
});
