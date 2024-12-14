const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rotas do CRUD de produtos
router.post('/', produtoController.createProduto);
router.get('/', produtoController.getAllProdutos);
router.put('/:id', produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;


