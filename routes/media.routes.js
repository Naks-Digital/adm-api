const express = require("express");
const router = express.Router();
const csvController = require("../controllers/media/csv.controller");
const upload = require("../middlewares/upload");

let routes = (app) => {
  app.post(
    "/uploadCSV",
    upload.uploadCSVFile.single("file"),
    csvController.uploadCSV
  );
  app.post(
    "/uploadImage",
    upload.uploadImage.single("image"),
    csvController.uploadImage
  );
  // router.get("/getmedia", csvController.getMedia);
  app.get("/media", csvController.getMedia);
  app.post("/media", csvController.postOneSite);
  app.get("/media/:id", csvController.getMediaById);
  app.delete("/media", csvController.deleteSite);
  // app.use("/api/csv", router);
};

module.exports = routes;
