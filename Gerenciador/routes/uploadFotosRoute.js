const express = require('express');
const multer = require('multer');
const { uploadImage, getImage } = require('../controllers/uploadFotos');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('foto'), uploadImage);
router.get('/:id', getImage);

module.exports = router;
