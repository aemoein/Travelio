const multer = require("multer");
const ApiError = require("../utils/ApiErrors");
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require("../utils/cloudinary");
const multerOptions=()=>{
    // const multerStorge = multer.memoryStorage();
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'CloudinaryDemo',
            allowedFormats: ['jpeg', 'png', 'jpg'],
        },
    });

    /*const multerFilter = function (req, file, cb) {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb(new ApiError("only image allowed", 400), false);
      }
    };*/
    const upload = multer({ storage: storage});

    return  upload;

}
exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);