const multer = require("multer");

const csvFilter = (req, file, cb) => {
  // if (file.mimetype.includes("csv")) {
  //   cb(null, true);
  // } else {
  //   cb("Please upload only csv file.", false);
  // }
  cb(null, true);
};

// var imageFilter = (req, image, cb) => {
//   cb(null, true);
// };

var imageFilter = (req, image, cb) => {
  // if (image.mimetype.includes("png", ".jpg", "jpeg"))
  if (image.mimetype.includes("png")) {
    cb(null, true);
  }
  // var ext = image.extname(image.originalname);
  // if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
  //   cb(null, true);
  // }
  else {
    cb('Please upload images with ".png" as extensions.', false);
  }
};
//   var ext = path.extname(file.originalname);
//   if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
//       return callback(new Error('Only images are allowed'))
//   }
//   callback(null, true)
// },
// limits:{
//   fileSize: 1024 * 1024
// }
// }).single('profilepic');

var csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/adm-api/resources/static/assets/csv_uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var imageStorage = multer.diskStorage({
  destination: (req, image, cb) => {
    cb(null, __basedir + "/adm-api/resources/static/assets/image_uploads/");
  },
  filename: (req, image, cb) => {
    console.log("Hi I am the image name: " + image.originalname);
    console.log("Hi I am the image: " + image);
    cb(null, `${Date.now()}-bezkoder-${image.originalname}`);
  },
});

var uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter });
var uploadCSVFile = multer({ storage: csvStorage, fileFilter: csvFilter });
// module.exports = uploadCSVFile;
module.exports = {
  uploadCSVFile,
  uploadImage,
};
