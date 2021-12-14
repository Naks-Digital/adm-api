const db = require("../../models");
// const { sequelize } = require("./models");
const media = db.Media;

const fs = require("fs");
const csv = require("fast-csv");
// const imageParse = require("react-image-parser");
const { sequelize } = require("../../models");
const { validateCSV } = require("../../utils/validateCSV");

const postOneSite = async (req, res) => {
  // console.log(JSON.stringify(req.body));
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

// const uploadImage = async (req, res) => {
//   try {
//     if (req.file == undefined) {
//       return res.status(400).send("Please upload an image");
//     }
//     let imageToBeUploaded = req.file.originalname;
//     let pathOfImage =
//       __dirname +
//       "/adm-api/resources/static/assets/image_uploads/" +
//       req.file.originalname;
//     console.log(
//       "This is the image that is being uploaded: " +
//         imageToBeUploaded +
//         "whole file: " +
//         req.file +
//         "path of the image: " +
//         pathOfImage
//     );

//     var tmpString = Object.values(req.query).join("&");
//     var updatedParamsString = tmpString.split(" ").join("&");
//     var sql = `UPDATE media SET site_image[0] = '{C:/Naks/adm-api/resources/static/assets/image_uploads/${req.query.site_code}-image-${imageToBeUploaded}}' WHERE searchable_column @@to_tsquery('${updatedParamsString}')`;
//     await sequelize.query(sql, req.query.site_code).then(function () {
//       return res.status(200).send({
//         message: "Uploaded the file successfully: " + req.file.originalname,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Could not upload the image: ",
//     });
//   }
// };

const uploadImage = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an image");
    }
    let imageToBeUploaded = req.file.originalname;
    let pathOfImage =
      __dirname +
      "/adm-api/resources/static/assets/image_uploads/" +
      req.file.originalname;
    console.log(
      "This is the image that is being uploaded: " +
        imageToBeUploaded +
        "whole file: " +
        req.file +
        "path of the image: " +
        pathOfImage
    );

    var tmpString = Object.values(req.query).join("&");
    var updatedParamsString = tmpString.split(" ").join("&");
    var sqlToGetArrayLength = `SELECT site_image FROM media WHERE searchable_column @@to_tsquery('${updatedParamsString}')`;
    var sqlToSetReference;
    let isElement;
    await sequelize.query(sqlToGetArrayLength).then(function (response) {
      console.log(response[0][0].site_image);
      // console.log("length of array" + response[0][0].site_image.length);
      // console.log("LENGTH: " + response[0].length);
      console.log(response);
      isElement = response[0][0].site_image;
      // console.log("LENGTH: "+response[0][0].site_image.length);
      // return res.status(200).send({ message: "Got the array length" });
    });
    if (isElement != null) {
      if (
        isElement.indexOf(
          "C:/Naks/adm-api/resources/static/assets/image_uploads/" +
            req.query.site_code +
            "-image-" +
            imageToBeUploaded
        ) == -1
      ) {
        var length = isElement.length;
        sqlToSetReference = `UPDATE media SET site_image[${
          length + 1
        }] = 'C:/Naks/adm-api/resources/static/assets/image_uploads/${
          req.query.site_code
        }-image-${imageToBeUploaded}' WHERE searchable_column @@to_tsquery('${updatedParamsString}')`;
      } else {
        return res.status(200).send({
          message: "Image already exists ",
        });
      }
    } else {
      sqlToSetReference = `UPDATE media SET site_image = '{C:/Naks/adm-api/resources/static/assets/image_uploads/${req.query.site_code}-image-${imageToBeUploaded}}' WHERE searchable_column @@to_tsquery('${updatedParamsString}')`;
    }
    console.log(isElement);
    await sequelize
      .query(sqlToSetReference, req.query.site_code)
      .then(function () {
        return res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the image: ",
    });
  }
};

const uploadCSV = async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }
    // console.log("TO CHECK THE REQUEST: " + req.query.site_code);
    // req.file.map((row) => console.log(row));
    // validateCSV(req.file)
    let mediaObj = [];
    let path =
      __basedir +
      "/adm-api/resources/static/assets/csv_uploads/" +
      req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        mediaObj.push(row);
        // console.log("TO CHECK THE REQUEST: " + row.site_code);
      })
      .on("end", () => {
        // console.log("TO CHECK THE ARRAY: " + mediaObj);
        // const validationError = validateCSV(mediaObj);
        // if (validateCSV(mediaObj)) {
        const validate = (dataArray) => {
          for (let i = 0; i < dataArray.length; i++) {
            const rowError = validateCSV(dataArray[i]);
            if (rowError) {
              return `${rowError} on row number ${i + 1}`;
            }
          }
        };
        const validationError = validate(mediaObj);
        if (validationError) {
          return res.status(403).json({ error: validationError });
        } else {
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
          // } else {
          //   return res.json({ error: validationError });
          // }
        }
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

    if (len != 0) {
      // const rem = req.query.site_code.toString();
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

const deleteSite = async (req, res) => {
  try {
    var tmpString = Object.values(req.query).join("&");
    var updatedParamsString = tmpString.split(" ").join("&");
    var sql =
      `DELETE FROM media WHERE searchable_column @@to_tsquery('` +
      updatedParamsString +
      `');`;
    await sequelize.query(sql, media).then(function (resultedData) {
      // console.log(resultedData);
      return res.json(resultedData[0]);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  uploadCSV,
  uploadImage,
  getMedia,
  postOneSite,
  getMediaById,
  deleteSite,
};
