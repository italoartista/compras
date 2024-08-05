// routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Definir rotas para produtos
router.post('/', produtoController.criarProduto);
router.get('/:id', produtoController.obterProduto);
router.get('/', produtoController.listarProdutos);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.excluirProduto);

module.exports = router;
