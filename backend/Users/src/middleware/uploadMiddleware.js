const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = '../../../../assets/ProfilePics';
    try {
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (err) {
      console.error('Error creating upload directory:', err);
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.session.username + ext);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
