const { GridFSBucket } = require('mongodb');
const multer = require('multer');
const { Readable } = require('stream');

exports.uploadImage = (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });

    // Criar um stream legível a partir do buffer da imagem
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    // Fazer o upload para o MongoDB
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    readableStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
      const fileUrl = `/uploads/${uploadStream.id}`; // ID do arquivo no MongoDB
      res.status(201).json({ fileUrl });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
