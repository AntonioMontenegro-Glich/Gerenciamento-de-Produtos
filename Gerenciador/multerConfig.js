const multer = require('multer');
const path = require('path');
const fs = require('fs');

const pastaUpload = path.resolve(__dirname, "upload");

if (!fs.existsSync(pastaUpload)) {
  fs.mkdirSync(pastaUpload);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUpload);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase(); // Garante extensão em minúsculas
    const baseName = path.basename(file.originalname, ext);
    const fileName = `${timestamp}-${baseName}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowMimes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('O tipo de arquivo enviado não é permitido. Apenas arquivos JPEG e PNG são aceitos.'));
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
