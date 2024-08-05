// controllers/produtoController.js
const produtoModel = require('../models/produtoModel');

// Criar um Novo Produto
const criarProduto = (req, res) => {
    const { nome, descricao, preco, estoque } = req.body;
    const novoProduto = produtoModel.criarProduto(nome, descricao, preco, estoque);
    res.status(201).json(novoProduto);
};

// Ler Detalhes do Produto
const obterProduto = (req, res) => {
    const produto = produtoModel.obterProdutoPorId(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(produto);
};

// Listar Produtos
const listarProdutos = (req, res) => {
    const { nome, minPreco, maxPreco, minEstoque, maxEstoque } = req.query;
    const filtros = { nome, minPreco: Number(minPreco), maxPreco: Number(maxPreco), minEstoque: Number(minEstoque), maxEstoque: Number(maxEstoque) };
    const produtosFiltrados = produtoModel.filtrarProdutos(filtros);
    res.status(200).json(produtosFiltrados);
};

// Atualizar um Produto
const atualizarProduto = (req, res) => {
    const produto = produtoModel.atualizarProduto(req.params.id, req.body);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(produto);
};

// Excluir um Produto
const excluirProduto = (req, res) => {
    const sucesso = produtoModel.excluirProduto(req.params.id);
    if (!sucesso) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(204).send();
};

module.exports = { criarProduto, obterProduto, atualizarProduto, excluirProduto, listarProdutos };