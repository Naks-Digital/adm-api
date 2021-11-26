const express = require("express");
const router = express.Router();
const csvController = require("../controllers/media/csv.controller");
const upload = require("../middlewares/upload");
const {
  postOneSite,
  getMedia,
  getMediaById,
} = require("../controllers/media/csv.controller");

let routes = (app) => {
  router.post("/upload", upload.single("file"), csvController.upload);
  // router.get("/getmedia", csvController.getMedia);
  app.get("/media", getMedia);
  app.post("/media", postOneSite);
  app.get("/media/:id", getMediaById);

  app.use("/api/csv", router);
};

module.exports = routes;
