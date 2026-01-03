const Produto = require('../models/Produto');

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
};

exports.buscarProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar o produto' });
  }
};