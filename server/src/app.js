require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Produto = require('./models/Produto'); 

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor RSKBuys funcionando!');
});

app.post('/api/auth/login', (req, res) => {
  const { senha } = req.body;
  
  if (senha === process.env.ADMIN_SECRET) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Senha incorreta" });
  }
});

app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar" });
  }
});

app.get('/api/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: "ID inválido ou erro no servidor" });
  }
});

app.post('/api/produtos', async (req, res) => {
  console.log("Recebi um pedido de cadastro!", req.body);

  try {
    const novoProduto = req.body;
    const produtoCriado = await Produto.create(novoProduto);
    console.log("Produto criado no banco:", produtoCriado._id);
    res.status(201).json(produtoCriado);
  } catch (error) {
    console.error("Erro ao salvar:", error);
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro no Mongo:', err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});