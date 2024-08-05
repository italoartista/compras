// models/produtoModel.js
const { v4: uuidv4 } = require('uuid');

// Banco de dados em memória
let produtos = [];

// Funções para manipulação de produtos
const criarProduto = (nome, descricao, preco, estoque) => {
    const novoProduto = { id: uuidv4(), nome, descricao, preco, estoque };
    produtos.push(novoProduto);
    return novoProduto;
};

const obterProdutoPorId = (id) => produtos.find(p => p.id === id);

const atualizarProduto = (id, atualizacoes) => {
    let produto = obterProdutoPorId(id);
    if (produto) {
        produto = { ...produto, ...atualizacoes };
        produtos = produtos.map(p => p.id === id ? produto : p);
        return produto;
    }
    return null;
};

const listarProdutos = () => produtos;

const excluirProduto = (id) => {
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = { criarProduto, obterProdutoPorId, atualizarProduto, excluirProduto, listarProdutos };
