const cloudinary = require('cloudinary').v2;
const multer= require('../middleware/multer');
const dotenv = require("dotenv");
const { fileURLToPath } =require("url")
const path=require("path")
dotenv.config();

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
module.exports =cloudinary;