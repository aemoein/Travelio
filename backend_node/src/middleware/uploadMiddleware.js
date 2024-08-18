// uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validate file type if needed, example: allow only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Only images are allowed!'), false); // Reject file
    }
  }
});

module.exports = upload;