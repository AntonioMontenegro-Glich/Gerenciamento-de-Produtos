const { GridFSBucket } = require('mongodb');
const multer = require('multer');
const { Readable } = require('stream');

exports.uploadImage = (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });

    
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

   
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    readableStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
      const fileUrl = `/uploads/${uploadStream.id}`; 
      res.status(201).json({ fileUrl });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImage = (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });

    const { id } = req.params;

    const downloadStream = bucket.openDownloadStream(mongoose.Types.ObjectId(id));

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('end', () => {
      res.end();
    });

    downloadStream.on('error', () => {
      res.status(404).json({ error: 'Imagem não encontrada.' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};