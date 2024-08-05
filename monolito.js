// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Caminhos dos arquivos JSON
const caminhoProdutos = path.join(__dirname, 'produtos.json');
const caminhoPedidos = path.join(__dirname, 'pedidos.json');

// Função para ler dados do arquivo JSON
const lerDados = (caminho) => {
    if (!fs.existsSync(caminho)) {
        return [];
    }
    const dados = fs.readFileSync(caminho);
    return JSON.parse(dados);
};

// Função para escrever dados no arquivo JSON
const escreverDados = (caminho, dados) => {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
};

// Inicializar dados
let produtos = lerDados(caminhoProdutos);
console.log(produtos);
let pedidos = lerDados(caminhoPedidos);

// Helper para buscar produtos
const buscarProdutos = (query) => {
    return produtos.filter(p => {
        return (!query.nome || p.nome.toLowerCase().includes(query.nome.toLowerCase())) &&
               (!query.minPreco || p.preco >= parseFloat(query.minPreco)) &&
               (!query.maxPreco || p.preco <= parseFloat(query.maxPreco)) &&
               (!query.minEstoque || p.estoque >= parseInt(query.minEstoque)) &&
               (!query.maxEstoque || p.estoque <= parseInt(query.maxEstoque));
    });
};

// Rotas para Produtos

// Criar um Novo Produto
app.post('/api/produtos', (req, res) => {
    const { nome, descricao, preco, estoque } = req.body;
    const novoProduto = {
        id: uuidv4(),
        nome,
        descricao,
        preco,
        estoque
    };
    produtos.push(novoProduto);
    escreverDados(caminhoProdutos, produtos);
    res.status(201).json(novoProduto);
});

// Ler Detalhes do Produto
app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(produto);
});

// Atualizar um Produto
app.put('/api/produtos/:id', (req, res) => {
    let produto = produtos.find(p => p.id === req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

    const { nome, descricao, preco, estoque } = req.body;
    produto = { ...produto, nome, descricao, preco, estoque };
    produtos = produtos.map(p => p.id === req.params.id ? produto : p);
    escreverDados(caminhoProdutos, produtos);
    res.status(200).json(produto);
});

// Excluir um Produto
app.delete('/api/produtos/:id', (req, res) => {
    const produtoIndex = produtos.findIndex(p => p.id === req.params.id);
    if (produtoIndex === -1) return res.status(404).json({ message: 'Produto não encontrado' });

    produtos.splice(produtoIndex, 1);
    escreverDados(caminhoProdutos, produtos);
    res.status(204).send();
});

// Buscar e Filtrar Produtos
app.get('/api/produtos', (req, res) => {
    const resultados = buscarProdutos(req.query);
    res.status(200).json(resultados);
});

// Rotas para Pedidos

// Criar um Novo Pedido
app.post('/api/pedidos', (req, res) => {
    const { cliente, produtos: produtosPedido, data, total } = req.body;
    const novoPedido = {
        id: uuidv4(),
        cliente,
        produtos: produtosPedido,
        data: data ? new Date(data) : new Date(),
        total
    };
    pedidos.push(novoPedido);
    escreverDados(caminhoPedidos, pedidos);
    res.status(201).json(novoPedido);
});

// Ler Detalhes do Pedido
app.get('/api/pedidos/:id', (req, res) => {
    const pedido = pedidos.find(p => p.id === req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.status(200).json(pedido);
});

// Atualizar um Pedido
app.put('/api/pedidos/:id', (req, res) => {
    let pedido = pedidos.find(p => p.id === req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });

    const { cliente, produtos, data, total } = req.body;
    pedido = { ...pedido, cliente, produtos, data: data ? new Date(data) : pedido.data, total };
    pedidos = pedidos.map(p => p.id === req.params.id ? pedido : p);
    escreverDados(caminhoPedidos, pedidos);
    res.status(200).json(pedido);
});

// Excluir um Pedido
app.delete('/api/pedidos/:id', (req, res) => {
    const pedidoIndex = pedidos.findIndex(p => p.id === req.params.id);
    if (pedidoIndex === -1) return res.status(404).json({ message: 'Pedido não encontrado' });

    pedidos.splice(pedidoIndex, 1);
    escreverDados(caminhoPedidos, pedidos);
    res.status(204).send();
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});