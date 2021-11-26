const db = require("../../models");
// const { sequelize } = require("./models");
const media = db.Media;

const fs = require("fs");
const csv = require("fast-csv");
const { sequelize } = require("../../models");

const postOneSite = async (req, res) => {
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
    const postMedia = await media.create({
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
};

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let mediaObj = [];
    let path =
      __basedir +
      "/adm-api/resources/static/assets/uploads/" +
      req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        mediaObj.push(row);
      })
      .on("end", () => {
        media
          .bulkCreate(mediaObj)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getMedia = async (req, res) => {
  try {
    var paramsString = "";
    var sql = "";
    var modifiedSiteCode = "";
    const len = Object.keys(req.query).length;
    var tmpString = Object.values(req.query).join("&");
    var updatedParamsString = tmpString.split(" ").join("&");
    console.log("Merra joota hai Japani:" + updatedParamsString);

    if (len != 0 && req.query.site_code != null) {
      const rem = req.query.site_code.toString();
      // console.log("djhefdgjfsb" + rem);
      // modifiedSiteCode = rem.split(" ").join("&");
      // console.log(rem.split(" ").join("&"));
      // paramsString =
      //   (isNullOrEmpty(modifiedSiteCode) ? modifiedSiteCode : "") + " "

      //   (isNullOrEmpty(req.query.city_name) ? req.query.city_name : "") + " "

      //   (isNullOrEmpty(req.query.location) ? req.query.location : "");
      // sql =
      //   `select state_name, traffic_movement , post_code from media where searchable_column @@to_tsquery('` +
      //   paramsString +
      //   `')`;
      sql =
        `select * from media where searchable_column @@to_tsquery('` +
        updatedParamsString +
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
};

const getMediaById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const getOneMedia = await media.findOne({
      where: { id },
    });
    return res.json(getOneMedia);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  upload,
  getMedia,
  postOneSite,
  getMediaById,
};
