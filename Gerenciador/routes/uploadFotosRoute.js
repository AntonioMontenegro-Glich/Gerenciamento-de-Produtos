const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/uploadFotos');
const upload = multer();

router.post('/upload', upload.single('image'), uploadImage);
