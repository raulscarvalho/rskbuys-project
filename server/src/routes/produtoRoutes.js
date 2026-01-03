// server/src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto'); // Importa o modelo

// --- ROTA 1: Listar todos os produtos (GET) ---
// O endereço final fica: GET /api/produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- ROTA 2: Criar um novo produto (POST) ---
// O endereço final fica: POST /api/produtos
// ATENÇÃO: Aqui usamos apenas '/'
router.post('/', async (req, res) => {
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    imagem: req.body.imagem,
    categoria: req.body.categoria,
    estoque: req.body.estoque
  });

  try {
    const novoProduto = await produto.save();
    res.status(201).json(novoProduto); // 201 = Criado com sucesso
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 