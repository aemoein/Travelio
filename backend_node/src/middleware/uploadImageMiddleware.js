const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../utils/cloudinary");

const multerOptions = () => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'CloudinaryDemo',
            allowedFormats: ['jpeg', 'png', 'jpg'],
        },
    });

    const upload = multer({ storage: storage });

    return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) => multerOptions().fields(arrayOfFields);