// uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Set up multer storage engine to upload directly to Cloudinary
const storage = multer.diskStorage({});

// Initialize multer instance with Cloudinary storage engine
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