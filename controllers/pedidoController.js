// controllers/pedidoController.js
const pedidoModel = require('../models/pedidoModel');

// Criar um Novo Pedido
const criarPedido = (req, res) => {
    const { cliente, produtos, data, total } = req.body;
    const novoPedido = pedidoModel.criarPedido(cliente, produtos, data, total);
    res.status(201).json(novoPedido);
};

// Ler Detalhes do Pedido
const obterPedido = (req, res) => {
    const pedido = pedidoModel.obterPedidoPorId(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.status(200).json(pedido);
};

// Atualizar um Pedido
const atualizarPedido = (req, res) => {
    const pedido = pedidoModel.atualizarPedido(req.params.id, req.body);
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.status(200).json(pedido);
};

// Excluir um Pedido
const excluirPedido = (req, res) => {
    const sucesso = pedidoModel.excluirPedido(req.params.id);
    if (!sucesso) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.status(204).send();
};

module.exports = { criarPedido, obterPedido, atualizarPedido, excluirPedido };
