### Desafio: Refatoração de Sistema de Pedidos com Arquitetura Baseada em Classes e Camadas

#### Descrição do Desafio

Você recebeu a tarefa de refatorar um sistema simples de gerenciamento de pedidos, transformando-o em uma aplicação modular, organizada em camadas, e seguindo as melhores práticas de desenvolvimento. O objetivo é melhorar a manutenibilidade, escalabilidade e clareza do código, separando as responsabilidades em diferentes classes e camadas.

Atualmente, o sistema manipula pedidos através de funções isoladas em um único arquivo. Sua missão é:

1. **Modelar o Pedido como uma classe (`PedidoModel`).**
2. **Criar uma camada de acesso a dados (`PedidoRepository`)** para gerenciar a persistência dos pedidos.
3. **Desenvolver uma camada de serviço (`PedidoService`)** que contenha as regras de negócios para a criação, atualização, exclusão e obtenção de pedidos.

#### Tarefas

1. **Modelagem do Pedido (`PedidoModel`)**
   - Crie uma classe `Pedido` que represente um pedido no sistema.
   - A classe deve incluir propriedades como `id`, `cliente`, `produtos`, `data`, e `total`.
   - O `id` deve ser gerado automaticamente usando `UUID` (Universally Unique Identifier).
   - Garanta que a data seja definida automaticamente ao criar um novo pedido, caso não seja fornecida.

   ```javascript
   // models/PedidoModel.js
   const { v4: uuidv4 } = require('uuid');

   class Pedido {
       constructor(cliente, produtos, data = new Date(), total) {
           this.id = uuidv4();
           this.cliente = cliente;
           this.produtos = produtos;
           this.data = new Date(data);
           this.total = total;
       }
   }

   module.exports = Pedido;
   ```

2. **Camada de Acesso a Dados (`PedidoRepository`)**
   - Desenvolva uma classe `PedidoRepository` para gerenciar a persistência dos pedidos.
   - A classe deve incluir métodos para criar, obter, atualizar e excluir pedidos no banco de dados em memória.
   - Garanta que a integridade dos dados seja mantida ao atualizar ou excluir pedidos.

   ```javascript
   // repositories/PedidoRepository.js
   class PedidoRepository {
       constructor() {
           this.pedidos = [];
       }

       criar(pedido) {
           this.pedidos.push(pedido);
           return pedido;
       }

       obterPorId(id) {
           return this.pedidos.find(p => p.id === id);
       }

       atualizar(id, atualizacoes) {
           const index = this.pedidos.findIndex(p => p.id === id);
           if (index !== -1) {
               this.pedidos[index] = { ...this.pedidos[index], ...atualizacoes };
               return this.pedidos[index];
           }
           return null;
       }

       excluir(id) {
           const index = this.pedidos.findIndex(p => p.id === id);
           if (index !== -1) {
               this.pedidos.splice(index, 1);
               return true;
           }
           return false;
       }
   }

   module.exports = PedidoRepository;
   ```

3. **Camada de Serviço (`PedidoService`)**
   - Crie uma classe `PedidoService` que encapsule as regras de negócios relacionadas aos pedidos.
   - A classe deve utilizar a `PedidoRepository` para acessar os dados e oferecer métodos de alto nível para criar, obter, atualizar e excluir pedidos.
   - A lógica de negócios, como cálculos de totais ou validações, deve ser implementada nesta camada.

   ```javascript
   // services/PedidoService.js
   const Pedido = require('../models/PedidoModel');
   const PedidoRepository = require('../repositories/PedidoRepository');

   class PedidoService {
       constructor() {
           this.pedidoRepository = new PedidoRepository();
       }

       criarPedido(cliente, produtos, data, total) {
           const novoPedido = new Pedido(cliente, produtos, data, total);
           return this.pedidoRepository.criar(novoPedido);
       }

       obterPedidoPorId(id) {
           return this.pedidoRepository.obterPorId(id);
       }

       atualizarPedido(id, atualizacoes) {
           return this.pedidoRepository.atualizar(id, atualizacoes);
       }

       excluirPedido(id) {
           return this.pedidoRepository.excluir(id);
       }
   }

   module.exports = PedidoService;
   ```

4. **Integração e Testes**
   - Integre todas as camadas e teste o funcionamento do sistema refatorado.
   - Crie um arquivo de exemplo que demonstre a criação, consulta, atualização e exclusão de pedidos, usando a `PedidoService`.

   ```javascript
   const PedidoService = require('./services/PedidoService');

   const pedidoService = new PedidoService();

   // Criar um pedido
   const novoPedido = pedidoService.criarPedido('Cliente X', ['Produto 1', 'Produto 2'], '2024-08-10', 100.00);
   console.log(novoPedido);

   // Obter um pedido por ID
   const pedido = pedidoService.obterPedidoPorId(novoPedido.id);
   console.log(pedido);

   // Atualizar um pedido
   const pedidoAtualizado = pedidoService.atualizarPedido(novoPedido.id, { total: 120.00 });
   console.log(pedidoAtualizado);

   // Excluir um pedido
   const sucesso = pedidoService.excluirPedido(novoPedido.id);
   console.log(sucesso ? 'Pedido excluído com sucesso' : 'Pedido não encontrado');
   ```

#### Entrega

Refatore o código conforme descrito acima e garanta que o sistema funcione corretamente após as mudanças. Ao final, você terá um sistema organizado, seguindo os princípios de separação de responsabilidades e com uma arquitetura limpa e escalável.
