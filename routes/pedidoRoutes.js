// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Definir rotas para pedidos
router.post('/', pedidoController.criarPedido);
router.get('/:id', pedidoController.obterPedido);
router.put('/:id', pedidoController.atualizarPedido);
router.delete('/:id', pedidoController.excluirPedido);

module.exports = router;
