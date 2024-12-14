const express = require('express');
const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('image'), uploadImage);
