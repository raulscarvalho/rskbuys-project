const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!produtoAtualizado) {
      return res.status(404).json({ message: "Produto não encontrado para atualizar" });
    }
    
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const produtoExcluido = await Produto.findByIdAndDelete(req.params.id);
    
    if (!produtoExcluido) {
      return res.status(404).json({ message: "Produto não encontrado para excluir" });
    }
    
    res.json({ message: "Produto removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 