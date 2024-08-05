# Documento de Requisitos: Sistema de Compras

## Visão Geral

Este documento descreve os requisitos para o desenvolvimento de um sistema de compras para uma grande varejista utilizando Express.js e um banco de dados em memória. O sistema deve suportar operações básicas de CRUD (Criar, Ler, Atualizar, Excluir) para gerenciar produtos e pedidos, além de oferecer funcionalidades de busca e filtragem de produtos.

## Funcionalidades

### 1. Gerenciamento de Produtos

#### 1.1 Criar um Novo Produto

- **Endpoint:** `POST /api/produtos`
- **Descrição:** Adiciona um novo produto ao sistema.
- **Parâmetros do Corpo da Requisição:**
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "preco": "number",
    "estoque": "number"
  }
  ```
- **Resposta Sucessiva:**
  - Código: `201 Created`
  - Corpo:
    ```json
    {
      "id": "string",
      "nome": "string",
      "descricao": "string",
      "preco": "number",
      "estoque": "number"
    }
    ```

#### 1.2 Ler Detalhes do Produto

- **Endpoint:** `GET /api/produtos/:id`
- **Descrição:** Obtém os detalhes de um produto específico.
- **Parâmetros da URL:**
  - `id`: ID do produto.
- **Resposta Sucessiva:**
  - Código: `200 OK`
  - Corpo:
    ```json
    {
      "id": "string",
      "nome": "string",
      "descricao": "string",
      "preco": "number",
      "estoque": "number"
    }
    ```

#### 1.3 Atualizar um Produto

- **Endpoint:** `PUT /api/produtos/:id`
- **Descrição:** Atualiza as informações de um produto existente.
- **Parâmetros da URL:**
  - `id`: ID do produto.
- **Parâmetros do Corpo da Requisição:**
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "preco": "number",
    "estoque": "number"
  }
  ```
- **Resposta Sucessiva:**
  - Código: `200 OK`
  - Corpo:
    ```json
    {
      "id": "string",
      "nome": "string",
      "descricao": "string",
      "preco": "number",
      "estoque": "number"
    }
    ```

#### 1.4 Excluir um Produto

- **Endpoint:** `DELETE /api/produtos/:id`
- **Descrição:** Remove um produto do sistema.
- **Parâmetros da URL:**
  - `id`: ID do produto.
- **Resposta Sucessiva:**
  - Código: `204 No Content`

#### 1.5 Buscar e Filtrar Produtos

- **Endpoint:** `GET /api/produtos`
- **Descrição:** Busca e filtra produtos com base em parâmetros de consulta.
- **Parâmetros da Consulta:**
  - `nome`: Filtra produtos pelo nome (opcional).
  - `minPreco`: Filtra produtos com preço maior ou igual ao valor fornecido (opcional).
  - `maxPreco`: Filtra produtos com preço menor ou igual ao valor fornecido (opcional).
  - `minEstoque`: Filtra produtos com estoque maior ou igual ao valor fornecido (opcional).
  - `maxEstoque`: Filtra produtos com estoque menor ou igual ao valor fornecido (opcional).
- **Resposta Sucessiva:**
  - Código: `200 OK`
  - Corpo:
    ```json
    [
      {
        "id": "string",
        "nome": "string",
        "descricao": "string",
        "preco": "number",
        "estoque": "number"
      }
    ]
    ```

### 2. Gerenciamento de Pedidos

#### 2.1 Criar um Novo Pedido

- **Endpoint:** `POST /api/pedidos`
- **Descrição:** Cria um novo pedido no sistema.
- **Parâmetros do Corpo da Requisição:**
  ```json
  {
    "cliente": "string",
    "produtos": [
      {
        "produtoId": "string",
        "quantidade": "number"
      }
    ],
    "data": "string (ISO 8601)",
    "total": "number"
  }
  ```
- **Resposta Sucessiva:**
  - Código: `201 Created`
  - Corpo:
    ```json
    {
      "id": "string",
      "cliente": "string",
      "produtos": [
        {
          "produtoId": "string",
          "quantidade": "number"
        }
      ],
      "data": "string (ISO 8601)",
      "total": "number"
    }
    ```

#### 2.2 Ler Detalhes do Pedido

- **Endpoint:** `GET /api/pedidos/:id`
- **Descrição:** Obtém os detalhes de um pedido específico.
- **Parâmetros da URL:**
  - `id`: ID do pedido.
- **Resposta Sucessiva:**
  - Código: `200 OK`
  - Corpo:
    ```json
    {
      "id": "string",
      "cliente": "string",
      "produtos": [
        {
          "produtoId": "string",
          "quantidade": "number"
        }
      ],
      "data": "string (ISO 8601)",
      "total": "number"
    }
    ```

#### 2.3 Atualizar um Pedido

- **Endpoint:** `PUT /api/pedidos/:id`
- **Descrição:** Atualiza as informações de um pedido existente.
- **Parâmetros da URL:**
  - `id`: ID do pedido.
- **Parâmetros do Corpo da Requisição:**
  ```json
  {
    "cliente": "string",
    "produtos": [
      {
        "produtoId": "string",
        "quantidade": "number"
      }
    ],
    "data": "string (ISO 8601)",
    "total": "number"
  }
  ```
- **Resposta Sucessiva:**
  - Código: `200 OK`
  - Corpo:
    ```json
    {
      "id": "string",
      "cliente": "string",
      "produtos": [
        {
          "produtoId": "string",
          "quantidade": "number"
        }
      ],
      "data": "string (ISO 8601)",
      "total": "number"
    }
    ```

#### 2.4 Excluir um Pedido

- **Endpoint:** `DELETE /api/pedidos/:id`
- **Descrição:** Remove um pedido do sistema.
- **Parâmetros da URL:**
  - `id`: ID do pedido.
- **Resposta Sucessiva:**
  - Código: `204 No Content`

## Regras de Negócio

### 1. Produtos

#### 1.1 Busca e Filtragem

- **Busca por Nome:** Quando o parâmetro `nome` é fornecido, a busca deve ser feita com base em uma correspondência parcial (e.g., uso de `like` para correspondência parcial).
- **Filtragem por Preço:** Quando os parâmetros `minPreco` e `maxPreco` são fornecidos, a filtragem deve considerar produtos dentro do intervalo de preços especificado.
- **Filtragem por Estoque:** Quando os parâmetros `minEstoque` e `maxEstoque` são fornecidos, a filtragem deve considerar produtos com estoque dentro do intervalo especificado.
- **Ordenação:** Adicionar suporte para ordenação de resultados por preço e estoque, se necessário.

#### 1.2 Validação de Dados

- **Nome:** Deve ser uma string não vazia.
- **Preço:** Deve ser um número positivo.
- **Estoque:** Deve ser um número não negativo.

### 2. Pedidos

#### 2.1 Validação de Dados

- **Cliente:** Deve ser uma string não vazia.
- **Produtos:** Cada item deve conter um `produtoId` válido e uma `quantidade` positiva.
- **Data:** Se fornecida, deve estar no formato ISO 8601.
- **Total:** Deve ser um número positivo e refletir a soma dos preços dos produtos multiplicados pelas suas quantidades.

#### 2.2 Cálculo do Total

- **Total do Pedido:** Deve ser calculado como a soma dos preços dos produtos multiplicados pelas suas quantidades. O valor do total deve ser validado durante a criação e atualização do pedido.

## Requisitos Técnicos

- **Servidor:** Node.js com Express.js
- **Banco de Dados:** Em memória (para desenvolvimento e teste)
- **Autenticação:** (Definir se aplicável, por exemplo, JWT, OAuth2, etc.)
- **Validação:** Utilizar bibliotecas para validação de dados como express-validator ou Joi, se necessário.
- **Documentação:** API deve ser documentada com Swagger ou similar.

## Considerações

- **Segurança:** Implementar medidas de segurança apropriadas para proteger os dados.
- **Desempenho:** O sistema deve ser capaz de lidar com um grande número de operações simultâ

neas, dependendo do volume esperado.
- **Escalabilidade:** Planejar a escalabilidade para suportar crescimento futuro, caso a aplicação seja expandida para um banco de dados real.
