const express = require('express');
const upload = require("../multerConfig")
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rotas do CRUD de produtos
router.post('/create', upload.single('foto'), produtoController.createProduto);
router.get('/', produtoController.getAllProdutos);
router.put('/:id', upload.single('foto'), produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;


