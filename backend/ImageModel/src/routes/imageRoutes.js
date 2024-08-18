// routes/imageRoutes.js

const express = require('express');
const multer = require('multer');
const { predict, testConnection } = require('../controllers/imageController');

const router = express.Router();
const upload = multer();

router.post('/predict', upload.single('file'), predict);
router.get('/test', testConnection);

module.exports = router;