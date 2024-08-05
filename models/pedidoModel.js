    // models/pedidoModel.js
const { v4: uuidv4 } = require('uuid');

// Banco de dados em memória
let pedidos = [];

// Funções para manipulação de pedidos
const criarPedido = (cliente, produtos, data, total) => {
    const novoPedido = {
        id: uuidv4(),
        cliente,
        produtos,
        data: data ? new Date(data) : new Date(),
        total
    };
    pedidos.push(novoPedido);
    return novoPedido;
};

const obterPedidoPorId = (id) => pedidos.find(p => p.id === id);

const atualizarPedido = (id, atualizacoes) => {
    let pedido = obterPedidoPorId(id);
    if (pedido) {
        pedido = { ...pedido, ...atualizacoes };
        pedidos = pedidos.map(p => p.id === id ? pedido : p);
        return pedido;
    }
    return null;
};

const excluirPedido = (id) => {
    const index = pedidos.findIndex(p => p.id === id);
    if (index !== -1) {
        pedidos.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = { criarPedido, obterPedidoPorId, atualizarPedido, excluirPedido };
