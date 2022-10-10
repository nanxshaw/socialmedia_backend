const multer = require("multer");
const fs = require('fs')
const { promisify } = require('util')
const basedir = require('../config/basedir');


const deleteFile = promisify(fs.unlink)

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, basedir.image_profile);
      },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = {
    uploadFile,
    deleteFile
};


